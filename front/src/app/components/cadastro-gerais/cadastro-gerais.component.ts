import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { ModalTipoComponent } from './modal-tipo/modal-tipo.component';
import { ModalFabricanteComponent } from './modal-fabricante/modal-fabricante.component';
import { ModalCidadeComponent } from './modal-cidade/modal-cidade.component';
import { ModalEstadoComponent } from './modal-estado/modal-estado.component';
import { CrudService } from '../../services/crud.service';
import { Tipo } from '../../models/tipo.model';
import { Fabricante } from '../../models/fabricante.model';
import { Cidade } from '../../models/cidade.model';
import { Estado } from '../../models/estado.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmacaoDialogComponent } from '../common/confirmacao-dialog/confirmacao-dialog.component';

@Component({
  selector: 'app-cadastro-gerais',
  templateUrl: './cadastro-gerais.component.html',
  styleUrls: ['./cadastro-gerais.component.scss']
})
export class CadastroGeraisComponent implements OnInit, AfterViewInit {

  @ViewChild('paginatorTipos') 
  paginatorTipos!: MatPaginator;

  @ViewChild('paginatorFabricantes') 
  paginatorFabricantes!: MatPaginator;

  @ViewChild('paginatorCidades') 
  paginatorCidades!: MatPaginator;

  @ViewChild('paginatorEstados') 
  paginatorEstados!: MatPaginator;
  
  public colunasCadastro: string[] = ['nome', 'acoes'];
  public colunasEstado: string[] = ['nome', 'abreviacao', 'acoes'];

  public tipos = new MatTableDataSource<Tipo>([]);
  public fabricantes = new MatTableDataSource<Fabricante>([]);
  public cidades = new MatTableDataSource<Cidade>([]);
  public estados = new MatTableDataSource<Estado>([]);

  displayedColumnsTipos: string[] = ['id', 'nome', 'acoes'];
  dataSourceTipos!: MatTableDataSource<any>;

  constructor(
    private dialog: MatDialog,
    private crudService: CrudService,
    private toastr: ToastrService
  ) {
    this.tipos.filterPredicate = this.createFilter();
    this.fabricantes.filterPredicate = this.createFilter();
    this.cidades.filterPredicate = this.createFilter();
    this.estados.filterPredicate = (data: any, filter: string) => {
      const searchStr = (data.nome + data.abreviacao).toLowerCase();
      return searchStr.indexOf(filter.toLowerCase()) !== -1;
    };
  }

  ngOnInit(): void {
    this.carregarDados();
  }

  ngAfterViewInit(): void {
    this.tipos.paginator = this.paginatorTipos;
    this.fabricantes.paginator = this.paginatorFabricantes;
    this.cidades.paginator = this.paginatorCidades;
    this.estados.paginator = this.paginatorEstados;
  }

  private createFilter(): (data: any, filter: string) => boolean {
    return (data: any, filter: string): boolean => {
      return data.nome.toLowerCase().includes(filter.toLowerCase());
    };
  }

  aplicarFiltroTipos(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tipos.filter = filterValue.trim();
  }

  aplicarFiltroFabricantes(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.fabricantes.filter = filterValue.trim();
  }

  aplicarFiltroCidades(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cidades.filter = filterValue.trim();
  }

  aplicarFiltroEstados(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.estados.filter = filterValue.trim();
  }

  carregarDados(): void {
    this.carregarEstados();
    this.carregarTipos();
    this.carregarFabricantes();
    this.carregarCidades();
  }

  carregarTipos(): void {
    this.crudService.get<Tipo[]>('tipos').subscribe({
      next: (response) => {
        this.tipos.data = response;
      },
      error: (error) => {
        console.error('Erro ao carregar tipos:', error);
        this.toastr.error('Erro ao carregar tipos');
      }
    });
  }

  carregarFabricantes(): void {
    this.crudService.get<Fabricante[]>('fabricantes').subscribe({
      next: (response) => {
        this.fabricantes.data = response;
      },
      error: (error) => {
        console.error('Erro ao carregar fabricantes:', error);
        this.toastr.error('Erro ao carregar fabricantes');
      }
    });
  }

  carregarCidades(): void {
    this.crudService.get<Cidade[]>('cidades').subscribe({
      next: (response) => {
        this.cidades.data = response;
      },
      error: (error) => {
        console.error('Erro ao carregar cidades:', error);
        this.toastr.error('Erro ao carregar cidades');
      }
    });
  }

  carregarEstados(): void {
    this.crudService.get<Estado[]>('estados').subscribe({
      next: (response) => {
        this.estados.data = response;
      },
      error: (error) => {
        console.error('Erro ao carregar estados:', error);
        this.toastr.error('Erro ao carregar estados');
      }
    });
  }

  abrirModal(tipo: string, data?: any): void {
    let component: ComponentType<any>;
    switch (tipo) {
      case 'tipo':
        component = ModalTipoComponent;
        break;
      case 'fabricante':
        component = ModalFabricanteComponent;
        break;
      case 'cidade':
        component = ModalCidadeComponent;
        break;
      case 'estado':
        component = ModalEstadoComponent;
        break;
      default:
        return;
    }

    const dialogRef = this.dialog.open(component, {
      width: '500px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarDados();
      }
    });
  }

  excluirItem(tipo: string, id: number): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '400px',
      data: { mensagem: `Deseja realmente excluir este ${tipo}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.delete(`${tipo}s/${id}`).subscribe({
          next: () => {
            this.toastr.success(`${tipo} excluído com sucesso!`);
            this.carregarDados();
          },
          error: (error) => {
            console.error(`Erro ao excluir ${tipo}:`, error);
            this.toastr.error(`Erro ao excluir ${tipo}`);
          }
        });
      }
    });
  }

  abrirModalTipo(tipo?: Tipo): void {
    this.abrirModal('tipo', tipo);
  }

  abrirModalFabricante(fabricante?: Fabricante): void {
    this.abrirModal('fabricante', fabricante);
  }

  abrirModalCidade(cidade?: Cidade): void {
    this.abrirModal('cidade', cidade);
  }

  abrirModalEstado(estado?: Estado): void {
    this.abrirModal('estado', estado);
  }

  excluirTipo(id: number): void {
    this.excluirItem('tipo', id);
  }

  excluirFabricante(id: number): void {
    this.excluirItem('fabricante', id);
  }

  excluirCidade(id: number): void {
    this.excluirItem('cidade', id);
  }

  excluirEstado(id: number): void {
    this.excluirItem('estado', id);
  }
}
