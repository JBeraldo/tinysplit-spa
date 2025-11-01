import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page/dashboard-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { FullscreenLayoutComponent } from './layouts/fullscreen-layout/fullscreen-layout.component';
import { logoutResolver } from './features/auth/resolvers/logout.resolver';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { USER_ROUTES } from './features/user/user.routes';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard], 
    children: [
      { path: '', component: DashboardPageComponent },
    ],
  },
  {
    path: 'login',
    component: FullscreenLayoutComponent,
    resolve: {
      logged:  logoutResolver
    },
    children: AUTH_ROUTES
  },
    {
    path: 'user',
    component: FullscreenLayoutComponent,
    children: USER_ROUTES
  },
];
