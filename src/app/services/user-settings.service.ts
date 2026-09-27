import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FavouriteTeam } from '../models/favourite-team.model';
import { Team } from '../models/teams.model';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private readonly storage = inject(Storage);

  private storageKey(tournamentId: string, teamId: string): string {
    return `fav_${tournamentId}_${teamId}`;
  }

  async followTeam(team: Team, tournamentId: string, tournamentName: string): Promise<void> {
    const item: FavouriteTeam = { team, tournamentId, tournamentName };
    await this.storage.set(this.storageKey(tournamentId, team.id.toString()), JSON.stringify(item));
  }

  async unfollowTeam(team: Team, tournamentId: string): Promise<void> {
    await this.storage.remove(this.storageKey(tournamentId, team.id.toString()));
  }

  isFavouriteTeam(tournamentId: string, teamId: string): Promise<boolean> {
    return this.storage.get(this.storageKey(tournamentId, teamId)).then((value) => Boolean(value));
  }

  async getAllFavourites(): Promise<FavouriteTeam[]> {
    const results: FavouriteTeam[] = [];
    await this.storage.forEach((data, key) => {
      if (key.startsWith('fav_')) {
        results.push(JSON.parse(data) as FavouriteTeam);
      }
    });
    return results;
  }
}

