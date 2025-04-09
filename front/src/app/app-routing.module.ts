import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BasicLayoutComponent } from './components/common/layouts/basicLayout.component';
import { CadastroGeraisComponent } from './components/cadastro-gerais/cadastro-gerais.component';
import { ProdutosComponent } from './components/produtos/produtos.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  { 
    path: "",
    component: BasicLayoutComponent,
    children: [
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "cadastro-gerais",
        component: CadastroGeraisComponent
      },
      {
        path: "produtos",
        component: ProdutosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
