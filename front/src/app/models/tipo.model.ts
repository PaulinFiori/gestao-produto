import { Produto } from './produto.model';

export class Tipo {
    id?: number;
    nome: string;
    produtos?: Produto[];  // Relação OneToMany com Produto

    constructor(data?: Partial<Tipo>) {
        this.id = data?.id;
        this.nome = data?.nome || '';
        this.produtos = data?.produtos;
    }
} 