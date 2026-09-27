import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController, AlertController } from '@ionic/angular';
import { Tournament } from '../../models/tournament.model';
import { EliteApiService } from '../../services/elite-api.service';
import { NewTournamentPage } from '../new-tournament/new-tournament.page';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
  imports: [IonicModule],
})
export class TournamentsPage {
  private readonly router = inject(Router);
  private readonly eliteApi = inject(EliteApiService);
  private readonly modalController = inject(ModalController);
  private readonly alertController = inject(AlertController);
  private readonly toastService = inject(ToastService);

  tournaments = this.eliteApi.getTournaments();

  ionViewWillEnter(): void {
    this.eliteApi.refreshTournaments();
  }

  selectTournament(tournament: Tournament): void {
    void this.router.navigate(['teams', tournament.id]);
  }

  async deleteTournament(tournament: Tournament & { key: string }): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${tournament.name}?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.eliteApi.deleteTournament(tournament.id).subscribe({
              error: async (err) => {
                console.error('Failed to delete tournament', err);
                await this.toastService.showError('Failed to delete tournament');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async openNewTournamentModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: NewTournamentPage,
      canDismiss: true,
    });
    await modal.present();
    await modal.onWillDismiss();
  }
}
