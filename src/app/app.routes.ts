import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component')
  },
  {
    path: 'employees/:id',
    loadComponent: () => import('./employee-details/employee-details.component'),
  }
];
