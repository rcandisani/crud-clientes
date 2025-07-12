import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'sobre',
    loadComponent: () =>
      import('./pages/sobre/sobre.component').then(m => m.SobreComponent)
  },
  {
    path: 'clientes',
    loadComponent: () =>
      import('./cliente/cliente-list/cliente-list.component').then(m => m.ClienteListComponent)
  },
  {
    path: 'clientes/novo',
    loadComponent: () =>
      import('./cliente/cliente-form/cliente-form.component').then(m => m.ClienteFormComponent)
  },
  {
    path: 'clientes/:id',
    loadComponent: () =>
      import('./cliente/cliente-form/cliente-form.component').then(m => m.ClienteFormComponent)
  }
];
