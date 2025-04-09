import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutsModule } from "./components/common/layouts/layouts.module";
import { HomeModule } from './components/home/home.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ProdutosModule } from './components/produtos/produtos.module';
import { CadastroGeraisModule } from './components/cadastro-gerais/cadastro-gerais.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutsModule,
    HomeModule,
    ProdutosModule,
    CadastroGeraisModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
