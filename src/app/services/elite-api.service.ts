import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tournament } from '../models/tournament.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EliteApiService {
  apiUrl = '/tournaments';
  private baseUrl = 'https://elite-schedule-app-d0eb5-default-rtdb.europe-west1.firebasedatabase.app';
  private currentTourney: any = {};
  constructor(public http: HttpClient,public db: AngularFireDatabase) { }

  getTournamets() {
    return this.db.list<Tournament>(this.apiUrl).snapshotChanges()
      .pipe(map(response => response.map(tournament => this.assignKey(tournament))));
  }
  getTournametsDate(tourneyId): Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
    .pipe(map((response: Response) => {
      this.currentTourney = response;
      return this.currentTourney;
  }));
}
  getCurrentTourney() {
    return this.currentTourney;
  }

  addTournament(tournament: Tournament) {
      return this.db.list<Tournament>(this.apiUrl).push(tournament);
  }
  private assignKey(tournament) {
    return { ...tournament.payload.val(), key: tournament.key };
  }
}
