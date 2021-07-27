import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EliteApiService {
  private baseUrl = 'https://elite-schedule-app-d0eb5-default-rtdb.europe-west1.firebasedatabase.app';
  private currentTourney: any = {};
  constructor(public http: HttpClient) { }

  getTournamets(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tournaments.json`);
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
}
