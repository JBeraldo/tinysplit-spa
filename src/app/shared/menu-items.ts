import { MenuItem } from './shared.types';

export const menuItems: MenuItem[] = [
    { name: 'Home', icon: 'house', path: '/' },
    { name: 'Fluxo de Caixa', icon: 'money-bill-trend-up', path: '/cashflow' },
    { name: 'Contas', icon: 'bank', path: '/accounts' },
    { name: 'Perfil', icon: 'user', path: '/profile' },
    { name: 'Sair', icon: 'right-from-bracket', path: '/login' },
];
