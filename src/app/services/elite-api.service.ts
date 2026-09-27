import { inject, Injectable, signal, Signal } from '@angular/core';
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

  private readonly tournamentsSignal = signal<(Tournament & { key: string })[]>([]);

  constructor() {
    this.refreshTournaments();
  }

  getTournaments(): Signal<(Tournament & { key: string })[]> {
    return this.tournamentsSignal;
  }

  refreshTournaments(): void {
    this.http.get<(Tournament & { key: string })[]>(`${this.baseUrl}/tournaments`).subscribe({
      next: (data) => this.tournamentsSignal.set(data || []),
      error: (err) => console.error('Failed to load tournaments', err)
    });
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

  addTournament(tournament: Tournament): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/tournaments`, tournament).pipe(
      tap(() => this.refreshTournaments())
    );
  }

  addTeam(team: Team, tourneyId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/tournaments/${tourneyId}/teams`, team);
  }

  deleteTournament(tourneyId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tournaments/${tourneyId}`).pipe(
      tap(() => this.refreshTournaments())
    );
  }

  deleteTeam(tourneyId: string, teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tournaments/${tourneyId}/teams/${teamId}`);
  }
}
