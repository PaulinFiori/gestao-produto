import { Cidade } from './cidade.model';
import { Tipo } from './tipo.model';
import { Fabricante } from './fabricante.model';

export class Produto {
    id?: number;
    nome: string;
    valor: number;    // DECIMAL(10,2) no banco
    estoque: number;  // INT no banco
    cidade: Cidade;
    tipo: Tipo;
    fabricante: Fabricante;

    constructor(data?: Partial<Produto>) {
        this.id = data?.id;
        this.nome = data?.nome || '';
        this.valor = data?.valor || 0;
        this.estoque = data?.estoque || 0;
        this.cidade = data?.cidade || {} as Cidade;
        this.tipo = data?.tipo || {} as Tipo;
        this.fabricante = data?.fabricante || {} as Fabricante;
    }
}