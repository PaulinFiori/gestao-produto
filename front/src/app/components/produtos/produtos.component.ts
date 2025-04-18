import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalProdutoComponent } from './modal-produto/modal-produto.component';
import { CrudService } from '../../services/crud.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmacaoDialogComponent } from '../common/confirmacao-dialog/confirmacao-dialog.component';

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

  aplicarFiltroProdutos(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }

  editarProduto(produto: any) {
    const dialogRef = this.dialog.open(ModalProdutoComponent, {
      width: '500px',
      data: produto
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Produto atualizado com sucesso!');
        this.carregarProdutos();
      }
    });
  }

  excluirProduto(produto: any) {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '400px',
      data: { mensagem: `Deseja realmente excluir ${produto.nome}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudService.delete<any[]>('produtos/' + produto.id).subscribe({
          next: (produtos) => {
            this.toastr.success('Produto deletado com sucesso!');
            this.carregarProdutos();
          },
          error: (error) => {
            this.toastr.error('Erro ao deletar produto');
            console.error('Erro ao deletar produto:', error);
          }
        });
      }
    });
  }

  abrirModalAdicionarProduto(): void {
    const dialogRef = this.dialog.open(ModalProdutoComponent, {
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
