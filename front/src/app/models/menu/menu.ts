import { MenuItem } from '../menu/item-menu.model';

export const ADMIN_MENU: MenuItem[] = [
    {
        label: 'Home',
        icon: 'home',
        path: '/home'
    },
    {
        label: 'Produtos',
        icon: 'inventory',
        path: '/produtos'
    },
    {
        label: 'Cadastro Gerais',
        icon: 'assignment',
        path: '/cadastro-gerais'
    },
    {
        label: 'Usuários',
        icon: 'people',
        path: '/usuarios'
    },
    {
        label: 'Meu Perfil',
        icon: 'person',
        path: '/meu-perfil'
    }
];

export const USER_MENU: MenuItem[] = [
    {
        label: 'Home',
        icon: 'home',
        path: '/home'
    },
    {
        label: 'Produtos',
        icon: 'inventory',
        path: '/produtos'
    },
    {
        label: 'Meu Perfil',
        icon: 'person',
        path: '/meu-perfil'
    }
];

export const MENU: MenuItem[] = USER_MENU;