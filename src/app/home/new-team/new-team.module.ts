import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewTeamPageRoutingModule } from './new-team-routing.module';

import { NewTeamPage } from './new-team.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewTeamPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewTeamPage]
})
export class NewTeamPageModule {}
