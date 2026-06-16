import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'my-teams',
    loadComponent: () => import('./home/my-teams/my-teams.page').then( m => m.MyTeamsPage)
  },
  {
    path: 'tournaments',
    loadComponent: () => import('./home/tournaments/tournaments.page').then( m => m.TournamentsPage)
  },
  {
    path: 'teams/:tourneyId',
    loadComponent: () => import('./home/teams/teams.page').then( m => m.TeamsPage)
  },
  {
    path: 'game/:gameId',
    loadComponent: () => import('./details/game/game.page').then( m => m.GamePage)
  },
  {
    path: 'team-home/:teamId',
    loadComponent: () => import('./details/team-home/team-home.page').then( m => m.TeamHomePage)
  },
  {
    path: 'vibration',
    loadComponent: () => import('./additional-functions/vibration/vibration.page').then( m => m.VibrationPage)
  },
  {
    path: 'geolocation',
    loadComponent: () => import('./additional-functions/geolocation/geolocation.page').then( m => m.GeolocationPage)
  },
  {
    path: 'new-tournament',
    loadComponent: () => import('./home/new-tournament/new-tournament.page').then( m => m.NewTournamentPage)
  },
  {
    path: 'new-team',
    loadComponent: () => import('./home/new-team/new-team.page').then( m => m.NewTeamPage)
  },
  {
    path: '',
    redirectTo: 'my-teams',
    pathMatch: 'full'
  },
];
