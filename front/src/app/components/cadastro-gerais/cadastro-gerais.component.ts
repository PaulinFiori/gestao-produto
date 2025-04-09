import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  ngOnInit(): void {
    // futura integração com serviço
  }

  ngAfterViewInit(): void {
    this.tipos.paginator = this.paginatorTipos;
    this.fabricantes.paginator = this.paginatorFabricantes;
    this.cidades.paginator = this.paginatorCidades;
    this.estados.paginator = this.paginatorEstados;
  }
}
