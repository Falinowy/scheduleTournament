import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from '../models/tournament.model';
import { EliteApiService } from '../services/elite-api.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage  implements OnInit {
  tournaments: Tournament;

  constructor(
    private router: Router,
    private eliteApi: EliteApiService) { }
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
}
