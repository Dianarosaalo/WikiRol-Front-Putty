import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

export const CAMPANYAS_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./index-page/index-page.component').then(
        (m) => m.IndexPageComponent
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'tier',
    loadComponent: () =>
      import('./campanya-tier/campanya-tier.component').then(
        (m) => m.CampanyaTierComponent
      ),
      canActivate: [AuthGuard]
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./campanya-details/campanya-details.component').then(
        (m) => m.CampanyaDetailsComponent
      ),
      canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];
