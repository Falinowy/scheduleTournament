import { inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TourneyData } from '../models/tourneyData.model';
import { Tournament } from '../models/tournament.model';
import { Team } from '../models/teams.model';

interface FirebaseListSnapshot<T> {
  key: string;
  payload: { val: () => T };
}

@Injectable({
  providedIn: 'root',
})
export class EliteApiService {
  private readonly tournamentsPath = '/tournaments';
  private readonly tournamentsDataPath = '/tournaments-data';
  private readonly baseUrl =
    'https://elite-schedule-app-d0eb5-default-rtdb.europe-west1.firebasedatabase.app';

  currentTourney = signal<TourneyData | null>(null);

  private readonly http = inject(HttpClient);
  private readonly db = inject(AngularFireDatabase);

  private readonly tournamentsSignal = toSignal(
    this.db.list<Tournament>(this.tournamentsPath).snapshotChanges().pipe(
      map((snapshots) => snapshots.map((snapshot) => this.assignKey(snapshot))),
    ),
    { initialValue: [] }
  );

  getTournaments(): Signal<(Tournament & { key: string })[]> {
    return this.tournamentsSignal;
  }

  getTournamentData(tourneyId: string): Observable<TourneyData> {
    return this.http
      .get<TourneyData>(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .pipe(
        tap((data) => {
          this.currentTourney.set(data);
        }),
        catchError((err: unknown) => {
          console.error('Failed to load tournament data', err);
          return throwError(() => err);
        }),
      );
  }



  addTournament(tournament: Tournament): void {
    void this.db.database.ref(this.tournamentsPath).push(tournament);
  }

  addTeam(team: Team, tourneyId: string): void {
    void this.db.database.ref(`${this.tournamentsDataPath}/${tourneyId}`).push(team);
  }

  private assignKey<T>(snapshot: FirebaseListSnapshot<T>): T & { key: string } {
    return { ...snapshot.payload.val(), key: snapshot.key };
  }
}
