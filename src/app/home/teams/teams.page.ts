import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IonicModule, ModalController, SearchbarCustomEvent } from '@ionic/angular';
import { DivisionTeamsGroup } from '../../models/division-teams-group.model';
import { Team } from '../../models/teams.model';
import { Tournament } from '../../models/tournament.model';
import { EliteApiService } from '../../services/elite-api.service';
import { NewTeamPage } from '../new-team/new-team.page';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
  imports: [IonicModule],
})
export class TeamsPage implements OnInit {
  tourneyId = input.required<string>();
  selectedTourney = signal<Tournament | undefined>(undefined);
  allTeamDivisions = signal<DivisionTeamsGroup[]>([]);
  teams = signal<DivisionTeamsGroup[]>([]);
  isLoading = signal<boolean>(true);

  private readonly router = inject(Router);
  private readonly eliteApi = inject(EliteApiService);
  private readonly modalController = inject(ModalController);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadTournamentData();
  }

  selectTeam(team: Team): void {
    void this.router.navigate(['team-home', team.id]);
  }

  searchTeam(event: SearchbarCustomEvent): void {
    const query = (event.detail.value ?? '').toLowerCase();

    this.teams.set(
      this.allTeamDivisions()
        .map((division) => ({
          divisionName: division.divisionName,
          divisionTeams: division.divisionTeams.filter((team) =>
            team.name.toLowerCase().includes(query),
          ),
        }))
        .filter((division) => division.divisionTeams.length > 0)
    );
  }

  async openNewTeamModal(): Promise<void> {
    const tourney = this.selectedTourney();
    if (!tourney) return;
    const modal = await this.modalController.create({
      component: NewTeamPage,
      componentProps: { tournament: tourney },
      canDismiss: true,
    });
    await modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'added') {
      this.loadTournamentData();
    }
  }

  private loadTournamentData(): void {
    this.isLoading.set(true);
    this.eliteApi
      .getTournamentData(this.tourneyId())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe((result) => {
        if (!result) {
          return;
        }
        this.selectedTourney.set(result.tournament);
        const divisions = this.groupTeamsByDivision(result.teams);
        this.allTeamDivisions.set(divisions);
        this.teams.set(divisions);
      });
  }

  private groupTeamsByDivision(teams: Team[]): DivisionTeamsGroup[] {
    const divisions = new Map<string, Team[]>();

    for (const team of teams) {
      const divisionTeams = divisions.get(team.division) ?? [];
      divisionTeams.push(team);
      divisions.set(team.division, divisionTeams);
    }

    return Array.from(divisions.entries()).map(([divisionName, divisionTeams]) => ({
      divisionName,
      divisionTeams,
    }));
  }
}
