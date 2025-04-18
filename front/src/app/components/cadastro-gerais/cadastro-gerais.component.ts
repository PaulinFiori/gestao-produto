import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdicionarTipoComponent } from './modal-adicionar-tipo/modal-adicionar-tipo.component';
import { ModalAdicionarFabricanteComponent } from './modal-adicionar-fabricante/modal-adicionar-fabricante.component';
import { ModalAdicionarCidadeComponent } from './modal-adicionar-cidade/modal-adicionar-cidade.component';
import { ModalAdicionarEstadoComponent } from './modal-adicionar-estado/modal-adicionar-estado.component';
import { CrudService } from '../../services/crud.service';
import { Tipo } from '../../models/tipo.model';
import { Fabricante } from '../../models/fabricante.model';
import { Cidade } from '../../models/cidade.model';
import { Estado } from '../../models/estado.model';

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

  constructor(
    private dialog: MatDialog,
    private crudService: CrudService
  ) {
    // Configurar filtros personalizados para cada tabela
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
      }
    });
  }

  abrirModalAdicionarTipo(): void {
    const dialogRef = this.dialog.open(ModalAdicionarTipoComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarTipos();
      }
    });
  }

  abrirModalAdicionarFabricante(): void {
    const dialogRef = this.dialog.open(ModalAdicionarFabricanteComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarFabricantes();
      }
    });
  }

  abrirModalAdicionarCidade(): void {
    const dialogRef = this.dialog.open(ModalAdicionarCidadeComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarCidades();
      }
    });
  }

  abrirModalAdicionarEstado(): void { 
    const dialogRef = this.dialog.open(ModalAdicionarEstadoComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarEstados();
      }
    });
  }
}
