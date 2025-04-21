import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

export const FUNCTION_ROUTES: Routes = [
  {
    path: 'initiative',
    loadComponent: () =>
      import('./iniciativa-tracker/iniciativa-tracker.component').then(
        (m) => m.IniciativaTrackerComponent
      ),
      canActivate: [AuthGuard]
  },

]
