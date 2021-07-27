import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EliteApiService } from '../services/elite-api.service';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.page.html',
  styleUrls: ['./my-teams.page.scss'],
})
export class MyTeamsPage{
  public favourites: any;
  constructor(
    private router: Router,
    private eliteApi: EliteApiService,
    private userSettingsService: UserSettingsService
  ) {}

  ionViewDidEnter() {
    this.getFavouriteTeam();
  }
  goToTournaments() {
    this.router.navigate(['tournaments']);
  }
  favouriteTapped(favourite) {
    this.eliteApi
      .getTournametsDate(favourite.tournamentId)
      .subscribe((t) => this.router.navigate(['team-home', favourite.team]));
  }
  getFavouriteTeam() {
    this.favourites = this.userSettingsService.getAllFavourites();
  }
}
