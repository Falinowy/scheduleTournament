import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IonicModule, ModalController, SearchbarCustomEvent, AlertController } from '@ionic/angular';
import { DivisionTeamsGroup } from '../../models/division-teams-group.model';
import { Team } from '../../models/teams.model';
import { Tournament } from '../../models/tournament.model';
import { EliteApiService } from '../../services/elite-api.service';
import { NewTeamPage } from '../new-team/new-team.page';
import { ToastService } from '../../services/toast.service';

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
  private readonly alertController = inject(AlertController);
  private readonly toastService = inject(ToastService);

  ngOnInit(): void {
    this.loadTournamentData();
  }

  doRefresh(event: any): void {
    this.loadTournamentData(true, () => event.target.complete());
  }

  selectTeam(team: Team): void {
    void this.router.navigate(['team-home', this.tourneyId(), team.id]);
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
    const divisions = this.allTeamDivisions().map((d) => d.divisionName);
    const modal = await this.modalController.create({
      component: NewTeamPage,
      componentProps: { tournament: tourney, existingDivisions: divisions },
      canDismiss: true,
    });
    await modal.present();

    const { role } = await modal.onWillDismiss();
    if (role === 'added') {
      this.loadTournamentData(true);
    }
  }

  async deleteTeam(team: Team): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete team ${team.name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.eliteApi.deleteTeam(this.tourneyId(), team.id).subscribe({
              next: () => this.loadTournamentData(true),
              error: async (err: HttpErrorResponse) => {
                console.error('Failed to delete team', err);
                const message = err.error?.detail || 'An unexpected error occurred while deleting the team.';
                await this.toastService.showError(message);
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  private loadTournamentData(forceRefresh = false, onComplete?: () => void): void {
    if (!forceRefresh) {
      this.isLoading.set(true);
    }
    this.eliteApi
      .getTournamentData(this.tourneyId(), forceRefresh)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading.set(false);
          if (onComplete) onComplete();
        })
      )
      .subscribe({
        next: (result) => {
          if (!result) {
            return;
          }
          this.selectedTourney.set(result.tournament);
          const divisions = this.groupTeamsByDivision(result.teams);
          this.allTeamDivisions.set(divisions);
          this.teams.set(divisions);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            void this.router.navigate(['/tournaments']);
          } else {
            console.error('Failed to load tournament data', err);
          }
        }
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
