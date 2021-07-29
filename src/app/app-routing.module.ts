import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-teams',
    loadChildren: () => import('./home/my-teams/my-teams.module').then( m => m.MyTeamsPageModule)
  },
  {
    path: 'tournaments',
    loadChildren: () => import('./home/tournaments/tournaments.module').then( m => m.TournamentsPageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./home/teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./details/game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'team-home',
    loadChildren: () => import('./details/team-home/team-home.module').then( m => m.TeamHomePageModule)
  },
  {
    path: 'vibration',
    loadChildren: () => import('./additional functions/vibration/vibration.module').then( m => m.VibrationPageModule)
  },
  {
    path: 'geolocation',
    loadChildren: () => import('./additional functions/geolocation/geolocation.module').then( m => m.GeolocationPageModule)
  },
  {
    path: 'new-tournament',
    loadChildren: () => import('./home/new-tournament/new-tournament.module').then( m => m.NewTournamentPageModule)
  },
  {
    path: 'new-team',
    loadChildren: () => import('./home/new-team/new-team.module').then( m => m.NewTeamPageModule)
  },
  {
    path: '',
    redirectTo: 'my-teams',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
