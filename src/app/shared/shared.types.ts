import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ApiResponse {
    message: string
}

export interface MenuItem {
    name: string;
    icon: IconProp | '';
    path: string;
}