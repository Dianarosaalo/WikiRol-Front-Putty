import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

export const GAMES_ROUTES: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('./new-game/new-game.component').then(
        (m) => m.NewGameComponent
      ),
      canActivate: [AuthGuard]
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./game-details/game-details.component').then(
        (m) => m.GameDetailsComponent
      ),
      canActivate: [AuthGuard]
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import('./new-game/new-game.component').then(
        (m) => m.NewGameComponent
      ),
      canActivate: [AuthGuard]
  },
];
