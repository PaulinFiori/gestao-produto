import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MENU } from "src/app/models/menu/menu";
import { MenuItem } from "src/app/models/menu/item-menu.model";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

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
    private destroy$ = new Subject<void>();

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.menu = MENU;
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
        }
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
