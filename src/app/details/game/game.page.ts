import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Game } from '../../models/games.model';
import { TourneyData } from '../../models/tourneyData.model';
import { EliteApiService } from '../../services/elite-api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  imports: [IonicModule, DatePipe],
})
export class GamePage implements OnInit {
  tourneyId = input.required<string>();
  gameId = input.required<string>();

  game!: Game;
  gameTime = 0;

  private tourneyData: TourneyData | null = null;
  private readonly eliteApi = inject(EliteApiService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);


  doRefresh(event: any): void {
    this.eliteApi
      .getTournamentData(this.tourneyId(), true)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => event.target.complete())
      )
      .subscribe({
        next: (data) => this.initializeWithData(data),
        error: () => void this.router.navigate(['tournaments']),
      });
  }

  ngOnInit(): void {
    this.eliteApi
      .getTournamentData(this.tourneyId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => this.initializeWithData(data),
        error: () => void this.router.navigate(['tournaments']),
      });
  }

  selectTeam(teamId: number): void {
    if (!this.tourneyData) {
      return;
    }

    const team = this.tourneyData.teams.find((t) => t.id === teamId);
    if (team) {
      void this.router.navigate(['team-home', this.tourneyId(), team.id]);
    }
  }

  getScoreColor(ownScore: string, opponentScore: string): string {
    return Number(ownScore) > Number(opponentScore) ? 'primary' : 'danger';
  }

  private initializeWithData(data: TourneyData): void {
    this.tourneyData = data;
    const found = data.games.find((g) => g.id === Number(this.gameId()));
    if (found) {
      this.game = found;
      this.gameTime = Date.parse(String(this.game.time));
    }
  }
}

