import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UserPerfil, UserTokenClaims, UserAuthority } from '../models/user-roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api';
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string, photo: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (photo) {
      formData.append('photo', photo, photo.name);
    }

    return this.http.post(`${this.API_URL}/auth/register`, formData);
  }

  login(email: string, password: string, saveTempPassword: boolean = true): Observable<any> {    
    return this.http.post(`${this.API_URL}/auth/login`, { email, senha: password })
      .pipe(
        tap((response: any) => {
          if (response && response.access_token) {
            this.setTokens(response.access_token, response.refresh_token || null);
          }
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getToken();
    
    if (!refreshToken) {
      return of(null);
    }
    
    return this.http.post(
      `${this.API_URL}/auth/refresh-token`, 
      { refresh_token: refreshToken },
      {
        headers: {
          'Authorization': `Bearer ${accessToken || refreshToken}`,
          'Content-Type': 'application/json'
        }
      }
    ).pipe(
      tap((response: any) => {
        const responseObj = response as {access_token?: string, refresh_token?: string};
        
        if (responseObj && responseObj.access_token) {
          this.setTokens(responseObj.access_token, responseObj.refresh_token || refreshToken);
        } else if (typeof response === 'string') {
          this.setTokens(response, refreshToken);
        }
      }),
      catchError(error => {
        return this.http.post(
          `${this.API_URL}/auth/refresh-token`,
          refreshToken,
          { 
            headers: {
              'Content-Type': 'text/plain',
              'Authorization': `Bearer ${accessToken || refreshToken}`
            }
          }
        ).pipe(
          tap(response => {
            const responseObj = response as {access_token?: string, refresh_token?: string};
            
            if (responseObj && responseObj.access_token) {
              this.setTokens(responseObj.access_token, responseObj.refresh_token || refreshToken);
            } else if (typeof response === 'string') {
              this.setTokens(response, refreshToken);
            }
          }),
          catchError(() => {
            return of(null);
          })
        );
      })
    );
  }

  private decodeToken(token: string): UserTokenClaims | null {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload) as UserTokenClaims;
    } catch (e) {
      console.error('Erro ao decodificar token:', e);
      return null;
    }
  }
  
  getUserClaims(): UserTokenClaims | null {
    const token = this.getToken();
    if (!token) return null;
    
    return this.decodeToken(token);
  }

  hasPerfil(perfilRequerido: string): boolean {
    const claims = this.getUserClaims();
    return !!claims && claims.perfil === perfilRequerido;
  }

  isAdmin(): boolean {
    return this.hasPerfil(UserPerfil.ADMIN);
  }

  isUser(): boolean {
    return this.hasPerfil(UserPerfil.USER);
  }

  hasAuthority(authority: string): boolean {
    const claims = this.getUserClaims();
    return !!claims && !!claims.authorities && claims.authorities.includes(authority);
  }

  getAuthorities(): string[] {
    const claims = this.getUserClaims();
    return claims?.authorities || [];
  }
  
  getEmail(): string | null {
    const claims = this.getUserClaims();
    return claims?.sub || null;
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
