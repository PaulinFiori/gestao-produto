import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-modal-adicionar-produto',
    templateUrl: './modal-adicionar-produto.component.html',
    styleUrls: ['./modal-adicionar-produto.component.scss']
})
export class ModalAdicionarProdutoComponent {
    form: FormGroup;

    public tipos: string[] = ['Eletrônicos', 'Móveis', 'Informática'];
    public cidades: string[] = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'];
    public fabricantes: string[] = ['Samsung', 'LG', 'Dell'];

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalAdicionarProdutoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
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

    cancelar(): void {
        this.dialogRef.close();
    }

    salvar(): void {
        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }
}
