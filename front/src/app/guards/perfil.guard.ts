import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Verificação por tipo de perfil do usuário (A - Admin, U - Usuário comum)
    const requiredPerfil = route.data['perfil'] as Array<string>;
    if (requiredPerfil && requiredPerfil.length > 0) {
      // Verificar se o usuário tem algum dos perfis exigidos
      const hasPerfil = requiredPerfil.some(perfil => {
        if (perfil === 'A') return this.authService.isAdmin();
        if (perfil === 'U') return this.authService.isUser();
        return false;
      });
      
      if (hasPerfil) return true;
    }
    
    // Verificação por authorities específicas
    const requiredAuthorities = route.data['authorities'] as Array<string>;
    if (requiredAuthorities && requiredAuthorities.length > 0) {
      // Verificar se o usuário tem todas as authorities necessárias
      const hasAuthorities = requiredAuthorities.every(authority =>
        this.authService.hasAuthority(authority)
      );
      
      if (hasAuthorities) return true;
    }
    
    // Se não há requisitos de perfil ou authorities especificados, permite o acesso
    if ((!requiredPerfil || requiredPerfil.length === 0) && 
        (!requiredAuthorities || requiredAuthorities.length === 0)) {
      return true;
    }

    // Acesso negado - redirecionar para página inicial
    this.router.navigate(['/home']);
    return false;
  }
}