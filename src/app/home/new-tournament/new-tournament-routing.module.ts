import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTournamentPage } from './new-tournament.page';

const routes: Routes = [
  {
    path: '',
    component: NewTournamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewTournamentPageRoutingModule {}
