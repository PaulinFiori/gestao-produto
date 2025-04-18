import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Obtém os roles necessários da rota
    const requiredRoles = route.data['roles'] as Array<string>;
    
    // Obtém o usuário do localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRoles = user.roles || [];

    // Verifica se o usuário tem pelo menos um dos roles necessários
    if (requiredRoles && userRoles) {
      const hasRole = requiredRoles.some(role => userRoles.includes(role));
      if (hasRole) {
        return true;
      }
    }

    // Se não tiver permissão, redireciona para a página inicial
    this.router.navigate(['/home']);
    return false;
  }
}