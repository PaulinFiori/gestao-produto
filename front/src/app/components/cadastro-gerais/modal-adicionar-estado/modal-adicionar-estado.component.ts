import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';

@Component({
    selector: 'app-modal-adicionar-estado',
    templateUrl: './modal-adicionar-estado.component.html',
    styleUrls: ['./modal-adicionar-estado.component.scss']
})
export class ModalAdicionarEstadoComponent implements OnInit {
    
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalAdicionarEstadoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private crudService: CrudService
    ) {
        this.form = this.fb.group({
            nome: ['', Validators.required],
            abreviacao: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]]
        });
    }

    ngOnInit(): void {
    }

    cancelar(): void {
        this.dialogRef.close();
    }

    salvar(): void {
        if (this.form.valid) {
            this.crudService.post('estados', this.form.value).subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
                error: (error) => {
                    console.error('Erro ao salvar estado:', error);
                }
            });
        }
    }
    
}
