import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ADMIN_MENU, USER_MENU } from "src/app/models/menu/menu";
import { MenuItem } from "src/app/models/menu/item-menu.model";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserPerfil } from 'src/app/models/user-roles';

@Component({
    selector: "navigation",
    templateUrl: "navigation.template.html",
    styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit, OnDestroy {
    
    public menu: MenuItem[] = [];
    public isSmallScreen: boolean = false;
    public showExpandedSidenav: boolean = true;
    public userName: string = '';
    public userPhotoUrl: string = 'assets/images/default-avatar-icon.jpg';
    public userPerfil: string | null = null;
    private destroy$ = new Subject<void>();
    
    private getMenuByPerfil(perfil: string | null): MenuItem[] {
        if (perfil === UserPerfil.ADMIN) {
            return ADMIN_MENU;
        } else if (perfil === UserPerfil.USER) {
            return USER_MENU;
        }
        
        return USER_MENU;
    }

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.loadUserInfo();
        
        this.breakpointObserver
            .observe([Breakpoints.Large, Breakpoints.XLarge])
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                this.isSmallScreen = !result.matches;
                if (this.isSmallScreen) {
                    this.showExpandedSidenav = false;
                } else {
                    this.showExpandedSidenav = true;
                }
            });

        this.router.events
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (this.isSmallScreen) {
                    this.showExpandedSidenav = false;
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    toggleSidenav(): void {
        this.showExpandedSidenav = !this.showExpandedSidenav;
    }

    loadUserInfo(): void {
        const claims = this.authService.getUserClaims();
        
        if (claims) {
            this.userName = claims.nome || 'Usuário';
            this.userPerfil = claims.perfil;
            this.userPhotoUrl = claims.foto || 'assets/images/default-avatar-icon.jpg';
            
            this.menu = this.getMenuByPerfil(this.userPerfil);
        } else {
            this.menu = this.getMenuByPerfil(null);
        }
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
