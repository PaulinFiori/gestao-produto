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
import { UsuariosModule } from './components/usuarios/usuarios.module';
import { CadastroGeraisModule } from './components/cadastro-gerais/cadastro-gerais.module';
import { MeuPerfilModule } from './components/meu-perfil/meu-perfil.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CrudService } from './services/crud.service';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthModule } from './components/auth/auth.module';
import { JwtHttpInterceptor } from './interceptors/jwt-http.interceptor';
import { RefreshTokenInterceptor } from './interceptors/refresh-token.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxMaskDirective,
    NgxMaskPipe,
    LayoutsModule,
    HomeModule,
    ProdutosModule,
    CadastroGeraisModule,
    MeuPerfilModule,
    UsuariosModule,
  ],
  providers: [
    CrudService,
    provideNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
