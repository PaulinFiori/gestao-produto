import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonModulesModule } from "../common/common-modules/common-modules.module";
import { CadastroGeraisComponent } from "./cadastro-gerais.component";
import { AngularMaterialElementsModule } from "../common/angular-material-elements/angular-material-elements.module";
import { ModalAdicionarTipoComponent } from "./modal-adicionar-tipo/modal-adicionar-tipo.component";
import { ModalAdicionarFabricanteComponent } from "./modal-adicionar-fabricante/modal-adicionar-fabricante.component";
import { ModalAdicionarCidadeComponent } from "./modal-adicionar-cidade/modal-adicionar-cidade.component";
import { ModalAdicionarEstadoComponent } from "./modal-adicionar-estado/modal-adicionar-estado.component";

@NgModule({
    imports: [CommonModule, CommonModulesModule, AngularMaterialElementsModule],
    declarations: [CadastroGeraisComponent, ModalAdicionarTipoComponent, ModalAdicionarFabricanteComponent, ModalAdicionarCidadeComponent, ModalAdicionarEstadoComponent]
})
export class CadastroGeraisModule { }