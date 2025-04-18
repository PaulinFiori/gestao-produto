import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verifica se existe um token no localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      return true;
    }

    // Se não estiver autenticado, redireciona para a página de login
    this.router.navigate(['/login']);
    return false;
  }
} 