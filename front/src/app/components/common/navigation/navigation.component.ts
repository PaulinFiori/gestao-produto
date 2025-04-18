import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MENU } from "src/app/models/menu/menu";
import { MenuItem } from "src/app/models/menu/item-menu.model";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
    selector: "navigation",
    templateUrl: "navigation.template.html",
    styleUrls: ["./navigation.component.scss"]
})
export class NavigationComponent implements OnInit {
    
    public menu: MenuItem[] = [];
    public isSmallScreen: boolean = false;
    public showExpandedSidenav: boolean = true;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.menu = MENU;

        this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
            this.isSmallScreen = result.matches;
            if (this.isSmallScreen) {
                this.showExpandedSidenav = false;
            }
        });
    }

    toggleSidenav(): void {
        this.showExpandedSidenav = !this.showExpandedSidenav;
    }
}
