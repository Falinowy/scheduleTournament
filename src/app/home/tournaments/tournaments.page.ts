import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { Tournament } from '../../models/tournament.model';
import { EliteApiService } from '../../services/elite-api.service';
import { NewTournamentPage } from '../new-tournament/new-tournament.page';

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

  tournaments = this.eliteApi.getTournaments();

  selectTournament(tournament: Tournament): void {
    void this.router.navigate(['teams', tournament.id]);
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
