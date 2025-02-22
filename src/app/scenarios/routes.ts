import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

export const SCENARIO_ROUTES: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./scenarios-home/scenarios-home.component').then(
        (m) => m.ScenariosHomeComponent
      ),
      canActivate: [AuthGuard]
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./scenarios-add/scenarios-add.component').then(
        (m) => m.ScenariosAddComponent
      ),
      canActivate: [AuthGuard]
  },

  {
      path: ':id/edit',
      loadComponent: () =>
        import('./scenarios-add/scenarios-add.component').then(
          (m) => m.ScenariosAddComponent
        ),
        canActivate: [AuthGuard],
    },

]
