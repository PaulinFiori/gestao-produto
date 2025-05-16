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
    const requiredPerfil = route.data['perfil'] as Array<string>;
    if (requiredPerfil && requiredPerfil.length > 0) {
      const hasPerfil = requiredPerfil.some(perfil => {
        if (perfil === 'A') return this.authService.isAdmin();
        if (perfil === 'U') return this.authService.isUser();
        return false;
      });
      
      if (hasPerfil) return true;
    }
    
    const requiredAuthorities = route.data['authorities'] as Array<string>;
    if (requiredAuthorities && requiredAuthorities.length > 0) {
      const hasAuthorities = requiredAuthorities.every(authority =>
        this.authService.hasAuthority(authority)
      );
      
      if (hasAuthorities) return true;
    }
    
    if ((!requiredPerfil || requiredPerfil.length === 0) && 
        (!requiredAuthorities || requiredAuthorities.length === 0)) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}