import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, filter, switchMap, take, finalize, delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private refreshAttempts = 0;
  private maxRefreshAttempts = 3;
  private lastRefreshTime = 0;
  private minTimeBetweenRefresh = 2000;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('auth/refresh') && (Date.now() - this.lastRefreshTime) > this.minTimeBetweenRefresh) {
      this.refreshAttempts = 0;
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 && !request.url.includes('auth/refresh')) {
            return this.handle401Error(request, next);
          }
          if (error.status === 401 && request.url.includes('auth/refresh')) {
            this.refreshAttempts++;
            if (this.refreshAttempts >= this.maxRefreshAttempts) {
              this.authService.logout();
              this.router.navigate(['/login']);
              return throwError(() => new Error('Sessão expirada. Por favor, faça login novamente.'));
            }
          }
        }
        
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentTime = Date.now();
    
    if ((currentTime - this.lastRefreshTime) < this.minTimeBetweenRefresh) {
      this.refreshAttempts++;
      
      if (this.refreshAttempts >= this.maxRefreshAttempts) {
        this.authService.logout();
        this.router.navigate(['/login']);
        return throwError(() => new Error('Muitas tentativas de refresh. Faça login novamente.'));
      }
      
      return of(null).pipe(
        delay(this.minTimeBetweenRefresh),
        switchMap(() => this.handle401Error(request, next))
      );
    }
    
    this.lastRefreshTime = currentTime;
    
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response);
          this.refreshAttempts = 0;
          
          const newToken = response.access_token || (typeof response === 'string' ? response : null);
          if (!newToken) {
            throw new Error('Formato de token inválido');
          }
          
          return next.handle(this.addToken(request, newToken));
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.refreshAttempts++;
          
          if (this.refreshAttempts >= this.maxRefreshAttempts) {
            this.authService.logout();
            this.router.navigate(['/login']);
            return throwError(() => new Error('Erro na renovação do token. Faça login novamente.'));
          }
          
          return throwError(() => err);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(response => {
          const newToken = response.access_token || (typeof response === 'string' ? response : null);
          if (!newToken) {
            throw new Error('Formato de token inválido');
          }
          return next.handle(this.addToken(request, newToken));
        }),
        catchError(err => {
          this.refreshAttempts++;
          if (this.refreshAttempts >= this.maxRefreshAttempts) {
            this.authService.logout();
            this.router.navigate(['/login']);
            return throwError(() => new Error('Erro na recuperação do token. Faça login novamente.'));
          }
          return throwError(() => err);
        })
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

}
