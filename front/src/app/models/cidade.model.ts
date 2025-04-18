import { Estado } from './estado.model';
import { Produto } from './produto.model';

export class Cidade {
    id?: number;
    nome: string;
    estado: Estado;
    produtos?: Produto[];

    constructor(data?: Partial<Cidade>) {
        this.id = data?.id;
        this.nome = data?.nome || '';
        this.estado = data?.estado || {} as Estado;
        this.produtos = data?.produtos;
    }
} 