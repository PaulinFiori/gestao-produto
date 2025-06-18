import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonModulesModule } from "../common/common-modules/common-modules.module";
import { UsuariosComponent } from "./usuarios.component";
import { AngularMaterialElementsModule } from "../common/angular-material-elements/angular-material-elements.module";
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
    imports: [
        CommonModule, 
        CommonModulesModule, 
        AngularMaterialElementsModule,
        NgxMaskDirective,
        NgxMaskPipe
    ],
    declarations: [UsuariosComponent, ModalUsuarioComponent]
})
export class UsuariosModule { }
