import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BasicLayoutComponent } from './components/common/layouts/basicLayout.component';
import { CadastroGeraisComponent } from './components/cadastro-gerais/cadastro-gerais.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { PerfilGuard } from './guards/perfil.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  { 
    path: "",
    component: BasicLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "cadastro-gerais",
        component: CadastroGeraisComponent,
        canActivate: [PerfilGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: "produtos",
        component: ProdutosComponent,
        canActivate: [PerfilGuard],
        data: { roles: ['ADMIN', 'USER'] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
