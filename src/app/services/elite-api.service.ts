import { inject, Injectable, signal, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { TourneyData } from '../models/tourneyData.model';
import { Tournament } from '../models/tournament.model';
import { Team } from '../models/teams.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EliteApiService {
  private readonly baseUrl = environment.apiUrl;



  private readonly http = inject(HttpClient);

  private readonly tournamentsSignal = signal<(Tournament & { key: string })[]>([]);

  constructor() {
    this.refreshTournaments().subscribe();
  }

  getTournaments(): Signal<(Tournament & { key: string })[]> {
    return this.tournamentsSignal;
  }

  refreshTournaments(): Observable<(Tournament & { key: string })[]> {
    return this.http.get<(Tournament & { key: string })[]>(`${this.baseUrl}/tournaments`).pipe(
      tap({
        next: (data) => this.tournamentsSignal.set(data || []),
        error: (err) => console.error('Failed to load tournaments', err)
      })
    );
  }

  private tourneyDataCache = new Map<string, Observable<TourneyData>>();

  getTournamentData(tourneyId: string, forceRefresh = false): Observable<TourneyData> {
    if (forceRefresh || !this.tourneyDataCache.has(tourneyId)) {
      const request = this.http
        .get<TourneyData>(`${this.baseUrl}/tournaments/${tourneyId}/data`)
        .pipe(
          shareReplay(1),
          catchError((err: unknown) => {
            console.error('Failed to load tournament data', err);
            this.tourneyDataCache.delete(tourneyId);
            return throwError(() => err);
          })
        );
      this.tourneyDataCache.set(tourneyId, request);
    }
    return this.tourneyDataCache.get(tourneyId)!;
  }


  addTournament(tournament: Tournament): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/tournaments`, tournament).pipe(
      tap(() => this.refreshTournaments().subscribe())
    );
  }

  addTeam(team: Team, tourneyId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/tournaments/${tourneyId}/teams`, team);
  }

  deleteTournament(tourneyId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tournaments/${tourneyId}`).pipe(
      tap(() => this.refreshTournaments().subscribe())
    );
  }

  deleteTeam(tourneyId: string, teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tournaments/${tourneyId}/teams/${teamId}`);
  }
}
