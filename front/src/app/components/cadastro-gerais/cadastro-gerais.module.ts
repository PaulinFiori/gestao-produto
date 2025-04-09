import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonModulesModule } from "../common/common-modules/common-modules.module";
import { CadastroGeraisComponent } from "./cadastro-gerais.component";
import { AngularMaterialElementsModule } from "../common/angular-material-elements/angular-material-elements.module";

@NgModule({
    imports: [CommonModule, CommonModulesModule, AngularMaterialElementsModule],
    declarations: [CadastroGeraisComponent]
})
export class CadastroGeraisModule { }