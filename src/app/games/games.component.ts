import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent {
  @Input() games!: any;
  @Input() tourneyData!: any;
  constructor(private router: Router) { }

  gameClicked(game) {
    const sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.router.navigate(['game', sourceGame]);
  }

  getScoreDisplayBadgeClass(game) {
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

}
