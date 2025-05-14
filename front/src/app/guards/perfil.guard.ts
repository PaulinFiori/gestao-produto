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
    const requiredRoles = route.data['roles'] as Array<string>;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRoles = user.roles || [];
    
    if (requiredRoles && userRoles) {
      const hasRole = requiredRoles.some(role => userRoles.includes(role));
      if (hasRole) {
        return true;
      }
    }

    this.router.navigate(['/home']);
    return false;
  }
}