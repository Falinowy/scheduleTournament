import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { GamesComponent } from '../games/games.component';
import { StandingsComponent } from '../standings/standings.component';
import { Standings } from '../../models/standings.model';
import { TeamGameView } from '../../models/team-game-view.model';
import { Team } from '../../models/teams.model';
import { Game } from '../../models/games.model';
import { TourneyData } from '../../models/tourneyData.model';
import { EliteApiService } from '../../services/elite-api.service';
import { UserSettingsService } from '../../services/user-settings.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.page.html',
  styleUrls: ['./team-home.page.scss'],
  imports: [IonicModule, FormsModule, GamesComponent, StandingsComponent],
})
export class TeamHomePage implements OnInit {
  tourneyId = input.required<string>();
  teamId = input.required<string>();

  allStandings: Standings[] = [];
  teamStanding?: Standings;
  dateFilter = '';
  allGames: TeamGameView[] = [];
  useDateFilter = false;
  isFollowing = false;
  isLoading = signal(true);
  games?: TeamGameView[];
  team!: Team;
  tourneyData!: TourneyData;

  private readonly router = inject(Router);
  private readonly eliteApi = inject(EliteApiService);
  private readonly alertController = inject(AlertController);
  private readonly toastService = inject(ToastService);
  private readonly userSettings = inject(UserSettingsService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadData();
  }

  dateChanged(): void {
    if (this.useDateFilter && this.dateFilter) {
      const filterDate = new Date(this.dateFilter);
      this.games = this.allGames.filter(
        (g) => new Date(g.time).toDateString() === filterDate.toDateString(),
      );
    } else {
      this.games = this.allGames;
    }
  }

  async followTeam(): Promise<void> {
    this.isFollowing = true;
    await this.userSettings.followTeam(
      this.team,
      this.tourneyData.tournament.id,
      this.tourneyData.tournament.name,
    );
  }

  async unfollowTeam(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Unfollow?',
      message: 'Are you sure you want to unfollow?',
      buttons: [
        {
          text: 'Yes',
          handler: async () => {
            this.isFollowing = false;
            await this.userSettings.unfollowTeam(this.team, this.tourneyData.tournament.id);
            await this.toastService.showSuccess('You have unfollowed this team');
          },
        },
        { text: 'No' },
      ],
    });
    await alert.present();
  }

  goHome(): void {
    void this.router.navigate(['my-teams']);
  }

  doRefresh(event: any): void {
    this.loadData(true, () => event.target.complete());
  }

  private loadData(forceRefresh = false, onComplete?: () => void): void {
    this.eliteApi
      .getTournamentData(this.tourneyId(), forceRefresh)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          if (onComplete) onComplete();
        })
      )
      .subscribe({
        next: (data) => this.initializeWithData(data),
        error: () => {
          if (onComplete) onComplete();
          void this.router.navigate(['tournaments']);
        },
      });
  }

  private initializeWithData(data: TourneyData): void {
    this.isLoading.set(false);

    const foundTeam = data.teams.find((t) => t.id === Number(this.teamId()));
    if (!foundTeam) {
      void this.router.navigate(['teams', this.tourneyId()]);
      return;
    }

    this.team = foundTeam;
    this.tourneyData = data;
    this.loadGames();
    this.loadStandings();
  }

  private loadGames(): void {
    const mappedGames = this.tourneyData.games
      .filter((g) => this.team.name === g.team1 || this.team.name === g.team2)
      .map((g) => this.mapGameToView(g));

    this.games = mappedGames.length > 0 ? mappedGames : undefined;
    this.allGames = mappedGames;
  }

  private loadStandings(): void {
    this.allStandings = this.tourneyData.standings;
    this.teamStanding = this.tourneyData.standings.find((s) => s.teamName === this.team.name);

    if (this.team.id != null) {
      void this.userSettings
        .isFavouriteTeam(this.tourneyData.tournament.id, this.team.id.toString())
        .then((value) => (this.isFollowing = value));
    }
  }

  private mapGameToView(game: Game): TeamGameView {
    const isTeam1 = this.team.name === game.team1;

    return {
      gameId: game.id,
      opponent: isTeam1 ? game.team2 : game.team1,
      time: Date.parse(String(game.time)),
      location: game.location,
      locationUrl: game.locationUrl,
      scoreDisplay: this.buildScoreDisplay(isTeam1, game.team1Score, game.team2Score),
      homeAway: isTeam1 ? 'vs.' : 'at',
      division: this.team.division,
    };
  }

  private buildScoreDisplay(isTeam1: boolean, team1Score: string, team2Score: string): string {
    if (!team1Score || !team2Score) {
      return '';
    }

    const teamScore = isTeam1 ? team1Score : team2Score;
    const opponentScore = isTeam1 ? team2Score : team1Score;
    const winIndicator = Number(teamScore) > Number(opponentScore) ? 'W: ' : 'L: ';
    return `${winIndicator}${teamScore}-${opponentScore}`;
  }

}

