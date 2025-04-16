import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';

@Component({
    selector: 'app-modal-adicionar-produto',
    templateUrl: './modal-adicionar-produto.component.html',
    styleUrls: ['./modal-adicionar-produto.component.scss']
})
export class ModalAdicionarProdutoComponent implements OnInit {
    form: FormGroup;

    public tipos: string[] = ['Eletrônicos', 'Móveis', 'Informática'];
    public cidades: string[] = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'];
    public fabricantes: string[] = ['Samsung', 'LG', 'Dell'];

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalAdicionarProdutoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private crudService: CrudService
    ) {
        this.form = this.fb.group({
            nome: ['', Validators.required],
            valor: ['', Validators.required],
            estoque: ['', [Validators.required, Validators.min(0)]],
            tipo: ['', Validators.required],
            cidade: ['', Validators.required],
            fabricante: ['', Validators.required]
        });
    }

    ngOnInit(): void {
    }

    cancelar(): void {
        this.dialogRef.close();
    }

    salvar(): void {
        if (this.form.valid) {
            this.crudService.post('produtos', this.form.value).subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
                error: (error) => {
                    console.error('Erro ao salvar produto:', error);
                }
            });
        }
    }
    
}
