import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { Tipo } from '../../../models/tipo.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-modal-tipo',
    templateUrl: './modal-tipo.component.html',
    styleUrls: ['./modal-tipo.component.scss']
})
export class ModalTipoComponent implements OnInit {
    
    form: FormGroup;
    isEdit = false;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalTipoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private crudService: CrudService,
        private toastr: ToastrService
    ) {
        this.isEdit = !!data;
        this.form = this.fb.group({
            id: [data?.id || null],
            nome: [data?.nome || '', Validators.required]
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
            const request = this.isEdit ? 
                this.crudService.put<Tipo>(`tipos/${tipo.id}`, tipo) :
                this.crudService.post<Tipo>('tipos', tipo);

            request.subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
                error: (error) => {
                    this.toastr.error(`Erro ao ${this.isEdit ? 'atualizar' : 'salvar'} tipo`);
                    console.error(`Erro ao ${this.isEdit ? 'atualizar' : 'salvar'} tipo:`, error);
                }
            });
        } else {
            this.toastr.warning('Por favor, preencha todos os campos obrigatórios');
        }
    }
} 