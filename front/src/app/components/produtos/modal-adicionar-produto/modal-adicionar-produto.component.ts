import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-modal-adicionar-produto',
    templateUrl: './modal-adicionar-produto.component.html',
    styleUrls: ['./modal-adicionar-produto.component.scss']
})
export class ModalAdicionarProdutoComponent implements OnInit {
    form: FormGroup;

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
        public dialogRef: MatDialogRef<ModalAdicionarProdutoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private crudService: CrudService,
        private toastr: ToastrService
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
        this.carregarDados();
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
            // O valor já vem como número quando usando mask="separator.2"
            // Não precisa fazer conversão adicional
            
            this.crudService.post('produtos', formValue).subscribe({
                next: (response) => {
                    this.dialogRef.close(response);
                },
                error: (error) => {
                    this.toastr.error('Erro ao salvar produto');
                    console.error('Erro ao salvar produto:', error);
                }
            });
        } else {
            this.toastr.warning('Por favor, preencha todos os campos obrigatórios');
        }
    }
}
