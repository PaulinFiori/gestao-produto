import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
        @Inject(MAT_DIALOG_DATA) public data: any
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
            this.dialogRef.close(this.form.value);
        }
    }
    
}
