import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';
import { CrudService } from '../../services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmacaoDialogComponent } from '../common/confirmacao-dialog/confirmacao-dialog.component';
import { ROLE_ADMIN, ROLE_USER } from '../../config/roles';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;

  public isAdmin: boolean = false;
  public isUser: boolean = false;

  public colunas: string[] = [];
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private dialog: MatDialog,
    private crudService: CrudService,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.loadUserInfo();
    this.carregarUsuarios();
    this.checkPermissions();

    if(this.isAdmin) {
      this.colunas = ['nome', 'email', 'perfil', 'acoes'];
    } else {
      this.colunas = ['nome', 'email', 'perfil', 'acoes'];
    }
  }

  checkPermissions() {
    this.isAdmin = this.userService.hasPermission(ROLE_ADMIN);
    this.isUser = this.userService.hasPermission(ROLE_USER);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  carregarUsuarios() {
    this.crudService.get<any[]>('usuarios').subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar usuários');
        console.error('Erro ao carregar usuários:', error);
      }
    });
  }

  aplicarFiltroUsuarios(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }

  editarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(ModalUsuarioComponent, {
      width: '500px',
      data: usuario
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Usuário atualizado com sucesso!');
        this.carregarUsuarios();
      }
    });
  }

  excluirUsuario(usuario: any) {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '400px',
      data: { mensagem: `Deseja realmente excluir ${usuario.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.delete<any[]>('usuarios/' + usuario.id).subscribe({
          next: (usuarios) => {
            this.toastr.success('Usuário deletado com sucesso!');
            this.carregarUsuarios();
          },
          error: (error) => {
            this.toastr.error('Erro ao deletar usuário');
            console.error('Erro ao deletar usuário:', error);
          }
        });
      }
    });
  }

  adicionarUsuario() {
    const dialogRef = this.dialog.open(ModalUsuarioComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Usuário adicionado com sucesso!');
        this.carregarUsuarios();
      }
    });
  }
}
