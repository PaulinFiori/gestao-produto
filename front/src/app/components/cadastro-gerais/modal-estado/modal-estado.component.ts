import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-estado',
  templateUrl: './modal-estado.component.html',
  styleUrls: ['./modal-estado.component.scss']
})
export class ModalEstadoComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService,
    private toastr: ToastrService
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      id: [data?.id || null],
      nome: [data?.nome || '', Validators.required],
      abreviacao: [data?.abreviacao || '', [Validators.required, Validators.maxLength(2)]]
    });
  }

  ngOnInit(): void {
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.form.valid) {
      const estado = this.form.value;
      const request = this.isEdit ? 
        this.crudService.put<any>(`estados/${estado.id}`, estado) :
        this.crudService.post<any>('estados', estado);

      request.subscribe({
        next: (response) => {
          this.toastr.success(`Estado ${this.isEdit ? 'atualizado' : 'cadastrado'} com sucesso!`);
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.toastr.error(`Erro ao ${this.isEdit ? 'atualizar' : 'cadastrar'} estado`);
          console.error(`Erro ao ${this.isEdit ? 'atualizar' : 'cadastrar'} estado:`, error);
        }
      });
    } else {
      this.toastr.warning('Por favor, preencha todos os campos obrigatórios');
    }
  }
} 