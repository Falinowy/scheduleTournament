import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamHomePageRoutingModule } from './team-home-routing.module';

import { TeamHomePage } from './team-home.page';
import { GamesComponent } from '../games/games.component';
import { StandingsComponent } from '../standings/standings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamHomePageRoutingModule
  ],
  declarations: [TeamHomePage,GamesComponent,StandingsComponent]
})
export class TeamHomePageModule {}
