import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTeamPage } from './new-team.page';

const routes: Routes = [
  {
    path: '',
    component: NewTeamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTeamPageRoutingModule {}
