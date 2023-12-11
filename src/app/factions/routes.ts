import { Routes } from "@angular/router";
import { AuthGuard } from "../auth/guards/auth.guard";
import { leavePageGuard } from "../guards/leave-page.guard";

export const FACTION_ROUTES: Routes = [
  {
    path: 'add',
    loadComponent: () =>
      import('../factions/new-faction/new-faction.component').then(
        (m) => m.NewFactionComponent
      ),
      canActivate: [AuthGuard],
      canDeactivate:[ leavePageGuard]
  },
];
