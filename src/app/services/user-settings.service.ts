import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(private storage: Storage) { }

  favouriteTeam(team, tournamentId,tournamentName) {
    const item = { team, tournamentId, tournamentName};
    this.storage.set(team.id.toString(), JSON.stringify(item));
  }

  unFavouriteTeam(team) {
    this.storage.remove(team.id.toString());
  }

  isFavouriteTeam(teamId: string): Promise<boolean> {
    return this.storage.get(teamId).then(value => value? true : false);
  }

  getAllFavourites() {
    const results = [];
    this.storage.forEach(data => {
      results.push(JSON.parse(data));
   });
   return results;
  }

 }
