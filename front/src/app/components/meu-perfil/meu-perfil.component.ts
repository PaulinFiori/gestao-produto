import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  photoURL: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  usuarioAtual: Usuario = new Usuario();
  perfilForm!: FormGroup;
  carregando: boolean = true;
  salvando: boolean = false;
  editando: boolean = false;
  public userPhotoUrl: string = 'assets/images/default-avatar-icon.jpg';

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
  
  passwordMismatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password && !confirmPassword) {
      return null;
    }

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  inicializarFormulario(): void {
    this.perfilForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: this.passwordMismatchValidator });
  }

  carregarDadosUsuario(): void {
    this.carregando = true;
    this.crudService.get<Usuario>('usuarios/' + this.userService.getUserInfo().id).subscribe({
      next: (response: Usuario) => {
        this.usuarioAtual = response;
        this.preencherFormulario(response);
        this.userPhotoUrl = "http://localhost:4200/assets/images/" + response.foto || 'assets/images/default-avatar-icon.jpg';
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
    this.perfilForm.get('password')?.reset('');
    this.perfilForm.get('confirmPassword')?.reset('');
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.photoURL = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  salvarPerfil(): void {
    if (this.perfilForm.invalid) {
      return;
    }

    this.salvando = true;
    const { name, email, password } = this.perfilForm.value;
    const usuarioAtualizado: any = {
      name,
      email
    };

    if (password) {
      usuarioAtualizado.password = password;
    }

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (password) formData.append('password', password);
      formData.append('foto', this.selectedFile, this.selectedFile.name);
      this.crudService.putFormData<Usuario>('usuarios/' + this.usuarioAtual.id + '/com-foto', formData).subscribe({
        next: (response: Usuario) => {
          this.usuarioAtual = response;
          this.editando = false;
          this.salvando = false;
          this.toastr.success('Perfil atualizado com sucesso!');
          this.preencherFormulario(response);
          this.perfilForm.get('password')?.reset('');
          this.perfilForm.get('confirmPassword')?.reset('');
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
    } else {
      this.crudService.put<Usuario>('usuarios/' + this.usuarioAtual.id, usuarioAtualizado).subscribe({
        next: (response: Usuario) => {
          this.usuarioAtual = response;
          this.editando = false;
          this.salvando = false;
          this.toastr.success('Perfil atualizado com sucesso!');
          this.preencherFormulario(response);
          this.perfilForm.get('password')?.reset('');
          this.perfilForm.get('confirmPassword')?.reset('');
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
}
