import { Cidade } from './cidade.model';

export class Estado {
    id?: number;
    nome: string;
    abreviacao: string;  // VARCHAR(2) no banco
    cidades?: Cidade[];

    constructor(data?: Partial<Estado>) {
        this.id = data?.id;
        this.nome = data?.nome || '';
        this.abreviacao = data?.abreviacao || '';
        this.cidades = data?.cidades;
    }

    // Validação para garantir que abreviacao tenha sempre 2 caracteres
    static validarAbreviacao(abreviacao: string): boolean {
        return abreviacao.length === 2;
    }
} 