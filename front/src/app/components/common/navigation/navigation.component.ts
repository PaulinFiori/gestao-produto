import { Component, OnInit, Renderer2 } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
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
    public showExpandedSidenav: boolean = false;
    public selectedItem: MenuItem | null = null;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private router: Router,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        this.menu = MENU;

        this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
            this.isSmallScreen = result.matches;
        });
    }

    expandSidenav(item: MenuItem): void {
        // Se for tela pequena, navegue diretamente
        if (this.isSmallScreen) {
            this.router.navigate([item.path]);
            return;
        }
        
        this.selectedItem = item;
        this.showExpandedSidenav = true;
        
        // Navegar para a rota do item
        setTimeout(() => {
            this.router.navigate([item.path]);
        }, 100);
    }

    closeExpandedSidenav(): void {
        this.showExpandedSidenav = false;
    }
}
