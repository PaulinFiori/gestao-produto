import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-fabricante',
  templateUrl: './modal-fabricante.component.html',
  styleUrls: ['./modal-fabricante.component.scss']
})
export class ModalFabricanteComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalFabricanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService,
    private toastr: ToastrService
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      id: [data?.id || null],
      nome: [data?.nome || '', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.form.valid) {
      const fabricante = this.form.value;
      const request = this.isEdit ? 
        this.crudService.put<any>(`fabricantes/${fabricante.id}`, fabricante) :
        this.crudService.post<any>('fabricantes', fabricante);

      request.subscribe({
        next: (response) => {
          this.toastr.success(`Fabricante ${this.isEdit ? 'atualizado' : 'cadastrado'} com sucesso!`);
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.toastr.error(`Erro ao ${this.isEdit ? 'atualizar' : 'cadastrar'} fabricante`);
          console.error(`Erro ao ${this.isEdit ? 'atualizar' : 'cadastrar'} fabricante:`, error);
        }
      });
    } else {
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios');
    }
  }
} 