import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { Tipo } from '../../../models/tipo.model';

@Component({
    selector: 'app-modal-adicionar-tipo',
    templateUrl: './modal-adicionar-tipo.component.html',
    styleUrls: ['./modal-adicionar-tipo.component.scss']
})
export class ModalAdicionarTipoComponent implements OnInit {
    
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalAdicionarTipoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private crudService: CrudService
    ) {
        this.form = this.fb.group({
            nome: ['', Validators.required]
        });
    }

    ngOnInit(): void {
    }

    cancelar(): void {
        this.dialogRef.close();
    }

    salvar(): void {
        if (this.form.valid) {
            const tipo = new Tipo(this.form.value);
            this.crudService.post<Tipo>('tipos', tipo).subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
                error: (error) => {
                    console.error('Erro ao salvar tipo:', error);
                }
            });
        }
    }
}
