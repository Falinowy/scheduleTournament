import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EliteApiService } from '../../services/elite-api.service';
import { NewTournamentPage } from '../new-tournament/new-tournament.page';


@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage  implements OnInit {
  tournaments: any;

  constructor(
    private router: Router,
    private eliteApi: EliteApiService,
    public modalController: ModalController) { }
  ngOnInit(): void {
    this.getTournamets();
  }
  itemTapped(tournament) {
    this.router.navigate(['teams',tournament]);
  }
  getTournamets(){
    this.eliteApi.getTournamets().subscribe(result => {
      this.tournaments = result;
    });
  }
  async openNewTournamentModal() {
    const modal = await this.modalController.create({
      component: NewTournamentPage,
      swipeToClose: true,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    const data = await modal.onWillDismiss();

  }
}
