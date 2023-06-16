import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';

export const CHARACTERS_ROUTES: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('./new-character/new-character.component').then(
        (m) => m.NewCharacterComponent
      ),
      canActivate: [AuthGuard]
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./character-details/character-details.component').then(
        (m) => m.CharacterDetailsComponent
      ),
      canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./new-character/new-character.component').then(
        (m) => m.NewCharacterComponent
      ),
      canActivate: [AuthGuard]
  },
];
