import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonModulesModule } from "../common/common-modules/common-modules.module";
import { ProdutosComponent } from "./produtos.component";
import { AngularMaterialElementsModule } from "../common/angular-material-elements/angular-material-elements.module";
import { ModalAdicionarProdutoComponent } from './modal-adicionar-produto/modal-adicionar-produto.component';

@NgModule({
    imports: [CommonModule, CommonModulesModule, AngularMaterialElementsModule],
    declarations: [ProdutosComponent, ModalAdicionarProdutoComponent]
})
export class ProdutosModule { }