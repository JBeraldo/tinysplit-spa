import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { logoutResolver } from './resolvers/logout.resolver';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: LoginComponent,
  },
];