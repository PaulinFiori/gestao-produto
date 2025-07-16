import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/auth/login') || request.url.includes('/auth/register')) {
      return next.handle(request);
    }
    
    if (request.url.includes('/auth/refresh-token')) {
      if (request.headers.has('Authorization')) {
        return next.handle(request);
      }
      
      const refreshToken = this.authService.getRefreshToken();
      if (refreshToken) {
        const clonedRequest = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });
        return next.handle(clonedRequest);
      }
    }
    
    const accessToken = this.authService.getToken();
    if (accessToken) {
      let clonedRequest = request;
      if (!(request.body instanceof FormData)) {
        clonedRequest = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        clonedRequest = request.clone({
          setHeaders: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
      }
      return next.handle(clonedRequest);
    }
    
    return next.handle(request);
  }
  
}
