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
import { BlankLayoutComponent } from './components/common/layouts/blankLayout.component';
const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "",
    component: BlankLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "cadastre",
        component: RegisterComponent
      }
      ]
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
        data: { perfil: ['A'] } // Somente admins podem acessar
      },
      {
        path: "produtos",
        component: ProdutosComponent,
        canActivate: [PerfilGuard],
        data: { perfil: ['A', 'U'] } // Admins e usuários comuns podem acessar
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
