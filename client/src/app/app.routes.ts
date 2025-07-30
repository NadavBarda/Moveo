import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Login,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'profile',
    component: Profile,
  },
  {
    path: 'register',
    component: Register,
  },
];
