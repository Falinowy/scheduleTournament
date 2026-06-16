import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FavouriteTeam } from '../models/favourite-team.model';
import { Team } from '../models/teams.model';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private readonly storage = inject(Storage);

  async followTeam(team: Team, tournamentId: string, tournamentName: string): Promise<void> {
    const item: FavouriteTeam = { team, tournamentId, tournamentName };
    await this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  async unfollowTeam(team: Team): Promise<void> {
    await this.storage.remove(team.id.toString());
  }

  isFavouriteTeam(teamId: string): Promise<boolean> {
    return this.storage.get(teamId).then((value) => Boolean(value));
  }

  async getAllFavourites(): Promise<FavouriteTeam[]> {
    const results: FavouriteTeam[] = [];
    await this.storage.forEach((data) => {
      results.push(JSON.parse(data) as FavouriteTeam);
    });
    return results;
  }
}
