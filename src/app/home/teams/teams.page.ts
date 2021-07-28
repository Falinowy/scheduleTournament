import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as _ from 'lodash';
import { Teams } from '../../models/teams.model';
import { EliteApiService } from '../../services/elite-api.service';
import { NewTeamPage } from '../new-team/new-team.page';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  selectedTourney: any;
  allTeamDivisions: any;
  teams: any;
  searchText: string;
  allTeams: Teams;

  constructor(
    private router: Router,
    private eliteApi: EliteApiService,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => (this.selectedTourney = params)
    );
    this.getTournametsDate();

  }
  itemTapped(team) {
    this.router.navigate(['team-home', team]);
  }
  getTournametsDate() {
    this.eliteApi
      .getTournametsDate(this.selectedTourney.id)
      .subscribe((result) => {
        if(result != null) {
          this.allTeams = result.teams;
          this.allTeamDivisions = _.chain(result.teams)
            .groupBy('division')
            .toPairs()
            .map((item) => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
          this.teams = this.allTeamDivisions;
        }
      });
  }
  searchTeam(searchText) {
    const searchTextLower = searchText.detail.value.toLowerCase();
    const filterdTeams = [];
    _.forEach(this.allTeamDivisions, (td) => {
      const teams = _.filter(td.divisionTeams, (t) =>
        t.name.toLowerCase().includes(searchTextLower)
      );
      if (teams.length) {
        filterdTeams.push({
          divisionName: td.divisionName,
          divisionTeams: teams,
        });
      }
    });
    this.teams = filterdTeams;
  }

  async openNewTeamModal(selectedTourney) {
    const modal = await this.modalController.create({
      component: NewTeamPage,
      componentProps: {id: selectedTourney},
      swipeToClose: true,
      cssClass: 'my-custom-class'
    });
    await modal.present();
    const data = await modal.onWillDismiss();

  }
}
