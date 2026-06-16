import { Component, inject, input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Game } from '../../models/games.model';
import { EliteApiService } from '../../services/elite-api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
  imports: [IonicModule, DatePipe],
})
export class GamePage implements OnInit {
  gameId = input.required<string>();
  
  game!: Game;
  gameTime = 0;

  private readonly eliteApi = inject(EliteApiService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    const tourney = this.eliteApi.currentTourney();
    if (!tourney) return;

    const found = tourney.games.find((g) => g.id === Number(this.gameId()));
    if (found) {
      this.game = found;
      this.gameTime = Date.parse(String(this.game.time));
    }
  }

  selectTeam(teamId: number): void {
    const tourneyData = this.eliteApi.currentTourney();
    if (!tourneyData) {
      return;
    }

    const team = tourneyData.teams.find((t) => t.id === teamId);
    if (team) {
      void this.router.navigate(['team-home', team.id]);
    }
  }

  getScoreColor(ownScore: string, opponentScore: string): string {
    return Number(ownScore) > Number(opponentScore) ? 'primary' : 'danger';
  }
}
