import { Routes } from '@angular/router';
import { authGuard } from './features/auth/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page/dashboard-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { FullscreenLayoutComponent } from './layouts/fullscreen-layout/fullscreen-layout.component';

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
    children: [
      { path: '', component: LoginComponent },
    ],
  },
];
