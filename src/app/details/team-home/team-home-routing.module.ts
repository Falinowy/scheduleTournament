import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamHomePage } from './team-home.page';

const routes: Routes = [
  {
    path: '',
    component: TeamHomePage,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamHomePageRoutingModule {}
