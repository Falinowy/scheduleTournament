import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TeamGameView } from '../../models/team-game-view.model';
import { TourneyData } from '../../models/tourneyData.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  imports: [IonicModule, DatePipe],
})
export class GamesComponent {
  games = input.required<TeamGameView[]>();
  tourneyData = input.required<TourneyData>();

  private readonly router = inject(Router);

  gameClicked(game: TeamGameView): void {
    const sourceGame = this.tourneyData().games.find((g) => g.id === game.gameId);
    if (sourceGame) {
      void this.router.navigate(['game', sourceGame.id]);
    }
  }

  getScoreDisplayBadgeClass(game: TeamGameView): string {
    return game.scoreDisplay.startsWith('W:') ? 'primary' : 'danger';
  }
}
