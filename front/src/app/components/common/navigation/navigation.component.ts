import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { MENU } from "src/app/models/menu/menu";
import { MenuItem } from "src/app/models/menu/item-menu.model";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: "navigation",
    templateUrl: "navigation.template.html",
    styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit, OnDestroy {
    
    public menu: MenuItem[] = [];
    public isSmallScreen: boolean = false;
    public showExpandedSidenav: boolean = true;
    private destroy$ = new Subject<void>();

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.menu = MENU;

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

        // Fechar menu ao mudar de rota em telas pequenas
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
}
