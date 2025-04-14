import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdicionarProdutoComponent } from './modal-adicionar-produto/modal-adicionar-produto.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;
  
  public colunas: string[] = ['nome', 'categoria', 'preco', 'acoes'];
  public dataSource = new MatTableDataSource<any>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  carregarProdutos() {
    const produtos = [
      { nome: 'Notebook', categoria: 'Informática', preco: 4500 },
      { nome: 'Celular', categoria: 'Eletrônicos', preco: 2500 },
      { nome: 'Cadeira Gamer', categoria: 'Móveis', preco: 1200 },
    ];

    this.dataSource.data = produtos;
  }

  adicionarProduto() {
    console.log('Adicionar novo produto');
  }

  editarProduto(produto: any) {
    console.log('Editar', produto);
  }

  excluirProduto(produto: any) {
    console.log('Excluir', produto);
  }

  abrirModalAdicionarProduto(): void {
    const dialogRef = this.dialog.open(ModalAdicionarProdutoComponent, {
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Produto adicionado:', result);
      }
    });
  }

}
