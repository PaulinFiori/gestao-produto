import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalAdicionarProdutoComponent } from './modal-adicionar-produto/modal-adicionar-produto.component';
import { CrudService } from '../../services/crud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) 
  paginator!: MatPaginator;
  
  public colunas: string[] = ['nome', 'fabricante', 'tipo', 'preco', 'acoes'];
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private dialog: MatDialog,
    private crudService: CrudService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  carregarProdutos() {
    this.crudService.get<any[]>('produtos').subscribe({
      next: (produtos) => {
        this.dataSource.data = produtos;
      },
      error: (error) => {
        this.toastr.error('Erro ao carregar produtos');
        console.error('Erro ao carregar produtos:', error);
      }
    });
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
        this.toastr.success('Produto adicionado com sucesso!');
        this.carregarProdutos();
      }
    });
  }

}
