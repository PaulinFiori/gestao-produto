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
    }
];

export const MENU: MenuItem[] = USER_MENU;