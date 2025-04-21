import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'campaigns',
    loadChildren: () =>
      import('./campanyas/routes').then((m) => m.CAMPANYAS_ROUTES),
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./characters/routes').then((m) => m.CHARACTERS_ROUTES),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./games/routes').then((m) => m.GAMES_ROUTES),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/routes').then((m) => m.USER_ROUTES),
  },
  {
    path: 'factions',
    loadChildren: () =>
      import('./factions/routes').then((m) => m.FACTION_ROUTES),
  },
  {
    path: 'scenarios',
    loadChildren: () =>
      import('./scenarios/routes').then((m) => m.SCENARIO_ROUTES),
  },
  {
    path: 'functions',
    loadChildren: () =>
      import('./functions/routes').then((m) => m.FUNCTION_ROUTES),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
