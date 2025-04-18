import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CadastroGeraisComponent } from './cadastro-gerais.component';
import { ModalTipoComponent } from './modal-tipo/modal-tipo.component';
import { ModalFabricanteComponent } from './modal-fabricante/modal-fabricante.component';
import { ModalCidadeComponent } from './modal-cidade/modal-cidade.component';
import { ModalEstadoComponent } from './modal-estado/modal-estado.component';

@NgModule({
  declarations: [
    CadastroGeraisComponent,
    ModalTipoComponent,
    ModalFabricanteComponent,
    ModalCidadeComponent,
    ModalEstadoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    CadastroGeraisComponent
  ]
})
export class CadastroGeraisModule { }