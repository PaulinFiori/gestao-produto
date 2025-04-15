import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdicionarTipoComponent } from './modal-adicionar-tipo/modal-adicionar-tipo.component';
import { ModalAdicionarFabricanteComponent } from './modal-adicionar-fabricante/modal-adicionar-fabricante.component';
import { ModalAdicionarCidadeComponent } from './modal-adicionar-cidade/modal-adicionar-cidade.component';
import { ModalAdicionarEstadoComponent } from './modal-adicionar-estado/modal-adicionar-estado.component';

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

  public tipos = new MatTableDataSource([
    { nome: 'Eletrônico' },
    { nome: 'Móvel' }
  ]);

  public fabricantes = new MatTableDataSource([
    { nome: 'Samsung' },
    { nome: 'Dell' }
  ]);

  public cidades = new MatTableDataSource([
    { nome: 'São Paulo' },
    { nome: 'Belo Horizonte' }
  ]);

  public estados = new MatTableDataSource([
    { nome: 'Minas Gerais' },
    { nome: 'São Paulo' }
  ]);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tipos.paginator = this.paginatorTipos;
    this.fabricantes.paginator = this.paginatorFabricantes;
    this.cidades.paginator = this.paginatorCidades;
    this.estados.paginator = this.paginatorEstados;
  }

  abrirModalAdicionarTipo(): void {
    const dialogRef = this.dialog.open(ModalAdicionarTipoComponent, {
      width: '500px'
    });
  }

  abrirModalAdicionarFabricante(): void {
    const dialogRef = this.dialog.open(ModalAdicionarFabricanteComponent, {
      width: '500px'
    });
  }

  abrirModalAdicionarCidade(): void {
    const dialogRef = this.dialog.open(ModalAdicionarCidadeComponent, {
      width: '500px'
    });
  }

  abrirModalAdicionarEstado(): void { 
    const dialogRef = this.dialog.open(ModalAdicionarEstadoComponent, {
      width: '500px'
    });
  }

}
