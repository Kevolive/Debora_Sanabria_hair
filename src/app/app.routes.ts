import { Routes } from '@angular/router';
import { Home } from './core/features/home/home';

import { ClienteTable } from './core/features/clientes/pages/cliente-table/cliente-table';
import { Dashboard } from './core/layouts/dashboard/dashboard';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./core/features/auth/auth.routes').then(m => m.authRoutes)
  },

  {
    path: 'home',
    component: Home
  },

  {
    path: 'clientes',
    component: ClienteTable,
  },
  {
    path:'dashboard',
    component: Dashboard
  },

  {
    path: '**',
    redirectTo: 'home'
  }
];
