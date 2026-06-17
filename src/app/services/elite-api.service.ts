import { inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TourneyData } from '../models/tourneyData.model';
import { Tournament } from '../models/tournament.model';
import { Team } from '../models/teams.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EliteApiService {
  private readonly baseUrl = environment.apiUrl;

  currentTourney = signal<TourneyData | null>(null);

  private readonly http = inject(HttpClient);

  private readonly tournamentsSignal = toSignal(
    this.http.get<(Tournament & { key: string })[]>(`${this.baseUrl}/tournaments`),
    { initialValue: [] }
  );

  getTournaments(): Signal<(Tournament & { key: string })[]> {
    return this.tournamentsSignal;
  }

  getTournamentData(tourneyId: string): Observable<TourneyData> {
    return this.http
      .get<TourneyData>(`${this.baseUrl}/tournaments/${tourneyId}/data`)
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
    this.http.post(`${this.baseUrl}/tournaments`, tournament).subscribe({
      error: (err) => console.error('Failed to add tournament', err)
    });
  }

  addTeam(team: Team, tourneyId: string): void {
    this.http.post(`${this.baseUrl}/tournaments/${tourneyId}/teams`, team).subscribe({
      error: (err) => console.error('Failed to add team', err)
    });
  }
}
