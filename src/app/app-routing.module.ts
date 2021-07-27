import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-teams',
    loadChildren: () => import('./my-teams/my-teams.module').then( m => m.MyTeamsPageModule)
  },
  {
    path: 'tournaments',
    loadChildren: () => import('./tournaments/tournaments.module').then( m => m.TournamentsPageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'team-home',
    loadChildren: () => import('./team-home/team-home.module').then( m => m.TeamHomePageModule)
  },
  {
    path: 'vibration',
    loadChildren: () => import('./vibration/vibration.module').then( m => m.VibrationPageModule)
  },
  {
    path: 'geolocation',
    loadChildren: () => import('./geolocation/geolocation.module').then( m => m.GeolocationPageModule)
  },
  {
    path: '',
    redirectTo: 'my-teams',
    pathMatch: 'full'
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
