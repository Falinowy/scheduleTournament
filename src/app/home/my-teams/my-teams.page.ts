import { Component, inject } from '@angular/core';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FavouriteTeam } from '../../models/favourite-team.model';
import { EliteApiService } from '../../services/elite-api.service';
import { AppMenuService } from '../../services/app-menu.service';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.page.html',
  styleUrls: ['./my-teams.page.scss'],
  imports: [IonicModule],
})
export class MyTeamsPage {
  favourites: FavouriteTeam[] = [];

  private readonly router = inject(Router);
  private readonly eliteApi = inject(EliteApiService);
  private readonly appMenu = inject(AppMenuService);
  private readonly userSettings = inject(UserSettingsService);


  ionViewDidEnter(): void {
    void this.loadFavourites();
  }

  goToTournaments(): void {
    void this.router.navigate(['tournaments']);
  }

  openMenu(): void {
    this.appMenu.open();
  }

  navigateToFavourite(favourite: FavouriteTeam): void {
    this.eliteApi
      .getTournamentData(favourite.tournamentId)
      .pipe(take(1))
      .subscribe(() => {
        void this.router.navigate(['team-home', favourite.team.id]);
      });
  }

  private async loadFavourites(): Promise<void> {
    this.favourites = await this.userSettings.getAllFavourites();
  }
}
