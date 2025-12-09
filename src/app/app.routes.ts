import { Routes } from '@angular/router';
import { Home } from './core/features/home/home';
import { ClienteTable } from './core/features/clientes/pages/cliente-table/cliente-table';
import { Dashboard } from './core/layouts/dashboard/dashboard';
import { Login } from './core/features/auth/login/login';
import { authGuard, noAuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () => import('./core/features/auth/login/login').then(m => m.Login)

  },

  {
    path: 'home',
    canActivate: [authGuard],
    component: Home
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },

  {
    path: 'clientes',
    canActivate: [authGuard],
    loadComponent: () => import('./core/features/clientes/pages/cliente-table/cliente-table').then(m => m.ClienteTable)
  },



  {
    path: 'clientes/crear',
    canActivate: [authGuard],
    loadComponent: () => import('./core/features/clientes/components/cliente-form/cliente-form').then(m => m.ClienteForm)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
