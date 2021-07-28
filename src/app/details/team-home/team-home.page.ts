import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import * as _ from 'lodash';
import * as moment from 'moment';
import { GamesComponent } from '../games/games.component';
import { Standings } from '../../models/standings.model';
import { EliteApiService } from '../../services/elite-api.service';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.page.html',
  styleUrls: ['./team-home.page.scss'],
})
export class TeamHomePage implements OnInit {
  @ViewChild('gamesComponent') gamesComponent: GamesComponent;
  allStandings: Standings;
  teamStanding: Standings;
  dateFilter: string;
  allGames: any[];
  useDateFilter = false;
  isFollowing = false;
  games: any[];
  team: any;
  divisionFilter = 'division';
  tourneyData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eliteApi: EliteApiService,
    private alertController: AlertController,
    private toastController: ToastController,
    private userSettings: UserSettingsService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.team = params);
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.getGames();
    this.getStandings();
  }

  getGames() {
    console.log(this.tourneyData);
    this.games = _.chain(this.tourneyData.games)
      .filter(g => this.team.name === g.team1 || this.team.name === g.team2)
      .map(g => {
        const isTeam1 = (this.team.name === g.team1);
        const opponentName = isTeam1 ? g.team2 : g.team1;
        const scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay,
          homeAway: (isTeam1 ? 'vs.' : 'at')
        };
      })
      .value();
    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, { teamName: this.team.name });
    this.userSettings.isFavouriteTeam(this.team.id.toString()).then(value => this.isFollowing = value);
  }
  dateChanged() {
    if (this.useDateFilter) {
      this.games =_.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }

  }
  getStandings() {
    this.allStandings = this.tourneyData.standings;
    // this.allStandings = _.chain(this.standings)
    //                      .groupBy('division')
    //                      .toPairs()
    //                      .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //                      .value();
    //                      console.log(this.standings);
    //                      console.log(this.allStandings);


  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      const teamScore = (isTeam1 ? team1Score : team2Score);
      const opponentScore = (isTeam1 ? team2Score : team1Score);
      const winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
      return winIndicator + teamScore + '-' + opponentScore;
    }
    else {
      return '';
    }
  }

  toggleFollow() {
    if(this.isFollowing) {
      const confirm = this.alertController.create({
        header: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons : [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unFavouriteTeam(this.team);

              const toast = this.toastController.create({
                message: 'You have unfollowed this team',
                duration: 3000,
                position: 'bottom'
              }).then(res => {
                res.present();
            });
          }
        },
          {text: 'No'}
        ]
      }).then(res => {
        res.present();
      });
    } else {
      this.isFollowing = true;
      this.userSettings.favouriteTeam(this.team,this.tourneyData.tournament.id,this.tourneyData.tournament.name);
    }

  }

  goHome() {
    this.router.navigate(['my-teams']);
  }

}
