import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit  {

  constructor(
    private router: Router,
    private menu: MenuController,
    private storage: Storage) {

  }
  async ngOnInit() {
    await this.storage.create();
  }
  goToTournaments() {
    this.router.navigate(['tournaments']);
    this.closeMenu();
  }
  goHome() {
    this.router.navigate(['my-teams']);
    this.closeMenu();
  }
  closeMenu() {
    this.menu.close();
  }
  goVibration() {
    this.router.navigate(['vibration']);
    this.closeMenu();
  }
  goGeolocation() {
    this.router.navigate(['geolocation']);
    this.closeMenu();
  }
  goCamera() {
    this.router.navigate(['camera']);
    this.closeMenu();
  }
}
