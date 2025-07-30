import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/profile/profile').then((m) => m.Profile),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.Register),
  },
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
];
