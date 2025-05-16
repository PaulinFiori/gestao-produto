import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('auth/login') || request.url.includes('auth/register') || request.url.includes('auth/logout')) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401 && !request.url.includes('auth/refresh-token')) {
            return this.handle401Error(request, next);
          }
          
          if (error.status === 401 && request.url.includes('auth/refresh-token')) {
            this.authService.logout();
            this.router.navigate(['/login']);
            return throwError(() => new Error('Sessão expirada. Por favor, faça login novamente.'));
          }
          
          if (error.status === 403) {
            return throwError(() => new Error('Você não tem permissão para acessar este recurso.'));
          }
        }
        
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          
          if (!response) {
            this.authService.logout();
            this.router.navigate(['/login']);
            throw new Error('Resposta de refresh inválida');
          }
          
          this.refreshTokenSubject.next(response);
          
          const newToken = response.access_token || (typeof response === 'string' ? response : null);
          if (!newToken) {
            throw new Error('Formato de token inválido');
          }
          
          return next.handle(this.addToken(request, newToken));
        }),
        catchError(() => {
          this.isRefreshing = false;
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(() => new Error('Erro na renovação do token. Faça login novamente.'));
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
          if (!response) {
            throw new Error('Token de resposta inválido');
          }
          
          const newToken = response.access_token || (typeof response === 'string' ? response : null);
          if (!newToken) {
            throw new Error('Formato de token inválido');
          }
          
          return next.handle(this.addToken(request, newToken));
        }),
        catchError(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(() => new Error('Erro na recuperação do token. Faça login novamente.'));
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
