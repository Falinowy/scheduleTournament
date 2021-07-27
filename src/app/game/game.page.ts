import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EliteApiService } from '../services/elite-api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  game: any;
  gameTime: any;
  tourneyData: any;
  team: any;
  constructor(
    private route: ActivatedRoute,
    private eliteApi: EliteApiService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.game = params);
    this.gameTime = Date.parse(this.game.time);
  }
  teamTapped(teamId){
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.team = this.tourneyData.teams.find(x => x.id === parseInt(teamId, 10));
    this.router.navigate(['team-home', this.team]);
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2) ? 'primary' : 'danger';
  }
}
