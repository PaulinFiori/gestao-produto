import { Produto } from './produto.model';

export class Fabricante {
    id?: number;
    nome: string;
    produtos?: Produto[];

    constructor(data?: Partial<Fabricante>) {
        this.id = data?.id;
        this.nome = data?.nome || '';
        this.produtos = data?.produtos;
    }
} 