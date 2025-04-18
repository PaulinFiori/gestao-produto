import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { Fabricante } from '../../../models/fabricante.model';

@Component({
    selector: 'app-modal-adicionar-fabricante',
    templateUrl: './modal-adicionar-fabricante.component.html',
    styleUrls: ['./modal-adicionar-fabricante.component.scss']
})
export class ModalAdicionarFabricanteComponent implements OnInit {
    
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalAdicionarFabricanteComponent>,
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
            const fabricante = new Fabricante(this.form.value);
            this.crudService.post<Fabricante>('fabricantes', fabricante).subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
                error: (error) => {
                    console.error('Erro ao salvar fabricante:', error);
                }
            });
        }
    }
    
}
