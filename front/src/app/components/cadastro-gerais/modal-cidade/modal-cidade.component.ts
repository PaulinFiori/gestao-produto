import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { Estado } from '../../../models/estado.model';

@Component({
  selector: 'app-modal-cidade',
  templateUrl: './modal-cidade.component.html',
  styleUrls: ['./modal-cidade.component.scss']
})
export class ModalCidadeComponent implements OnInit {
  form: FormGroup;
  isEdit = false;
  estados: Estado[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCidadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService,
    private toastr: ToastrService
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      id: [data?.id || null],
      nome: [data?.nome || '', Validators.required],
      estado: [data?.estado || null, Validators.required]
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
        this.toastr.error('Erro ao carregar estados');
      }
    });
  }

  compareById(obj1: any, obj2: any): boolean {
    return obj1 && obj2 && obj1.id === obj2.id;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.form.valid) {
      const cidade = this.form.value;
      const request = this.isEdit ? 
        this.crudService.put<any>(`cidades/${cidade.id}`, cidade) :
        this.crudService.post<any>('cidades', cidade);

      request.subscribe({
        next: (response) => {
          this.toastr.success(`Cidade ${this.isEdit ? 'atualizada' : 'cadastrada'} com sucesso!`);
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.toastr.error(`Erro ao ${this.isEdit ? 'atualizar' : 'cadastrar'} cidade`);
          console.error(`Erro ao ${this.isEdit ? 'atualizar' : 'cadastrar'} cidade:`, error);
        }
      });
    } else {
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios');
    }
  }
} 