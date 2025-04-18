import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { Estado } from '../../../models/estado.model';
import { Cidade } from '../../../models/cidade.model';

@Component({
    selector: 'app-modal-adicionar-cidade',
    templateUrl: './modal-adicionar-cidade.component.html',
    styleUrls: ['./modal-adicionar-cidade.component.scss']
})
export class ModalAdicionarCidadeComponent implements OnInit {
    
    form: FormGroup;
    estados: Estado[] = [];

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalAdicionarCidadeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private crudService: CrudService
    ) {
        this.form = this.fb.group({
            nome: ['', Validators.required],
            estado: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.carregarEstados();
    }

    carregarEstados(): void {
        this.crudService.get<Estado[]>('estados').subscribe({
            next: (response) => {
                this.estados = response;
            },
            error: (error) => {
                console.error('Erro ao carregar estados:', error);
            }
        });
    }

    cancelar(): void {
        this.dialogRef.close();
    }

    salvar(): void {
        if (this.form.valid) {
            const cidade = new Cidade(this.form.value);
            this.crudService.post<Cidade>('cidades', cidade).subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
                error: (error) => {
                    console.error('Erro ao salvar cidade:', error);
                }
            });
        }
    }
}
