import { IconProp } from "@fortawesome/fontawesome-svg-core";

export let menuItems: Array<{ name: string, icon:IconProp | '' ,path: string }> = [
    { name: "Home", icon: 'house',  path: '' },
    { name: "Fluxo de Caixa", icon: 'money-bill-trend-up' , path: '' },
    { name: "Contas", icon: 'bank', path: '' },
    { name: "Perfil", icon: 'user', path: '' },
    { name: "Sair", icon: 'right-from-bracket', path: '/login' },
]