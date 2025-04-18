import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-modal-produto',
    templateUrl: './modal-produto.component.html',
    styleUrls: ['./modal-produto.component.scss']
})
export class ModalProdutoComponent implements OnInit {
    form: FormGroup;
    isEdit = false;

    public tipos: any[] = [];
    public cidades: any[] = [];
    public fabricantes: any[] = [];

    public currencyOptions = {
        prefix: 'R$ ',
        thousands: '.',
        decimal: ',',
        align: 'left',
        allowNegative: false,
        precision: 2
    };

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ModalProdutoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private crudService: CrudService,
        private toastr: ToastrService
    ) {
        this.isEdit = !!data;
        this.form = this.fb.group({
            id: [data?.id || null],
            nome: [data?.nome || '', Validators.required],
            valor: [data?.valor || '', Validators.required],
            estoque: [data?.estoque || '', [Validators.required, Validators.min(0)]],
            tipo: [data?.tipo || '', Validators.required],
            cidade: [data?.cidade || '', Validators.required],
            fabricante: [data?.fabricante || '', Validators.required]
        });
    }

    ngOnInit(): void {
        this.carregarDados();
    }

    compareById(obj1: any, obj2: any): boolean {
        return obj1 && obj2 && obj1.id === obj2.id;
    }

    carregarDados(): void {
        forkJoin({
            tipos: this.crudService.get<any[]>('tipos'),
            cidades: this.crudService.get<any[]>('cidades'),
            fabricantes: this.crudService.get<any[]>('fabricantes')
        }).subscribe({
            next: (response) => {
                this.tipos = response.tipos;
                this.cidades = response.cidades;
                this.fabricantes = response.fabricantes;
            },
            error: (error) => {
                this.toastr.error('Erro ao carregar dados');
                console.error('Erro ao carregar dados:', error);
            }
        });
    }

    cancelar(): void {
        this.dialogRef.close();
    }

    salvar(): void {
        if (this.form.valid) {
            const formValue = { ...this.form.value };
            
            const request = this.isEdit ? 
                this.crudService.put(`produtos/${formValue.id}`, formValue) :
                this.crudService.post('produtos', formValue);

            request.subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
                error: (error) => {
                    this.toastr.error(`Erro ao ${this.isEdit ? 'atualizar' : 'salvar'} produto`);
                    console.error(`Erro ao ${this.isEdit ? 'atualizar' : 'salvar'} produto:`, error);
                }
            });
        } else {
            this.toastr.warning('Por favor, preencha todos os campos obrigatórios');
        }
    }
}
