import { Routes } from '@angular/router';
import { Dashboard } from '../../layouts/dashboard/dashboard';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard }
];
