import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../services/crud.service';
import { Usuario } from '../../models/usuario.model';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss']
})
export class MeuPerfilComponent implements OnInit {

  usuarioAtual: Usuario = new Usuario();
  perfilForm!: FormGroup;
  carregando: boolean = true;
  salvando: boolean = false;
  editando: boolean = false;

  constructor(
    private crudService: CrudService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.carregarDadosUsuario();
  }
  
  inicializarFormulario(): void {
    this.perfilForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  carregarDadosUsuario(): void {
    this.carregando = true;
    this.crudService.get<Usuario>('usuarios/' + this.userService.getUserInfo().id).subscribe({
      next: (response: Usuario) => {
        this.usuarioAtual = response;
        this.preencherFormulario(response);
        this.carregando = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar dados do usuário:', error);
        this.carregando = false;
        this.toastr.error('Erro ao carregar dados do perfil');
      }
    });
  }

  preencherFormulario(usuario: Usuario): void {
    this.perfilForm.patchValue({
      name: usuario.name,
      email: usuario.email
    });
  }

  habilitarEdicao(): void {
    this.editando = true;
  }

  cancelarEdicao(): void {
    this.editando = false;
    this.preencherFormulario(this.usuarioAtual);
  }

  salvarPerfil(): void {
    if (this.perfilForm.invalid) {
      return;
    }

    this.salvando = true;
    const usuarioAtualizado = {
      ...this.perfilForm.value
    };

    this.crudService.put<Usuario>('usuarios/' + this.usuarioAtual.id, usuarioAtualizado).subscribe({
      next: (response: Usuario) => {
        this.usuarioAtual = response;
        this.editando = false;
        this.salvando = false;
        this.toastr.success('Perfil atualizado com sucesso!');
        
        if (this.userService.getUserInfo().name !== response.name) {
          this.userService.loadUserInfo();
        }
      },
      error: (error: any) => {
        console.error('Erro ao atualizar perfil:', error);
        this.salvando = false;
        this.toastr.error('Erro ao atualizar perfil');
      }
    });
  }
}
