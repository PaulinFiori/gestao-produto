import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-modal-adicionar-produto',
    templateUrl: './modal-adicionar-produto.component.html'
})
export class ModalAdicionarProdutoComponent {
    form: FormGroup;

    tipos: any[] = [];
    cidades: any[] = [];
    fabricantes: any[] = [];

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
