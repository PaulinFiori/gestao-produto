export class Usuario {
    id?: number;
    name?: string;
    email?: string;
    perfil?: string;
    createdAt?: string;
    updatedAt?: string;

    constructor(data?: Partial<Usuario>) {
        this.id = data?.id;
        this.name = data?.name || '';
        this.email = data?.email || '';
        this.perfil = data?.perfil || '';
        this.createdAt = data?.createdAt || '';
        this.updatedAt = data?.updatedAt || '';
    }

}