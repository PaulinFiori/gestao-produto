import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-modal-usuario',
    templateUrl: './modal-usuario.component.html',
    styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent implements OnInit {
    
    form: FormGroup;
    isEdit = false;
    perfis = [
        { value: 'A', viewValue: 'Administrador' },
        { value: 'U', viewValue: 'Usuário' }
    ];

    //falta fazer upload de foto de perfil, e recuperar senha
    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalUsuarioComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private crudService: CrudService,
        private toastr: ToastrService
    ) {
        this.isEdit = !!data;
        this.form = this.fb.group({
            id: [data?.id || null],
            name: [data?.name || '', Validators.required],
            email: [data?.email || '', [Validators.required, Validators.email]],
            perfil: [data?.perfil || '', Validators.required],
            password: ['', this.isEdit ? [] : Validators.required]   
        });
    }

    ngOnInit(): void {
    }

    cancelar(): void {
        this.dialogRef.close();
    }

    salvar(): void {
        if (this.form.valid) {
            const formValue = { ...this.form.value };
            
            const request = this.isEdit ? 
                this.crudService.put(`usuarios/${formValue.id}`, formValue) :
                this.crudService.post('usuarios', formValue);

            request.subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
                error: (error) => {
                    this.toastr.error(`Erro ao ${this.isEdit ? 'atualizar' : 'salvar'} usuário`);
                    console.error(`Erro ao ${this.isEdit ? 'atualizar' : 'salvar'} usuário:`, error);
                }
            });
        } else {
            this.toastr.warning('Por favor, preencha todos os campos obrigatórios');
        }
    }
}
