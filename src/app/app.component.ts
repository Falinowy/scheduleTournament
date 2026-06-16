import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AppMenuService } from './services/app-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonicModule, RouterModule],
})
export class AppComponent implements OnInit {
  readonly appMenu = inject(AppMenuService);
  private readonly router = inject(Router);
  private readonly storage = inject(Storage);

  async ngOnInit(): Promise<void> {
    await this.storage.create();
  }

  goToTournaments(): void {
    void this.router.navigate(['tournaments']);
    this.closeMenu();
  }

  goHome(): void {
    void this.router.navigate(['my-teams']);
    this.closeMenu();
  }

  goVibration(): void {
    void this.router.navigate(['vibration']);
    this.closeMenu();
  }

  goGeolocation(): void {
    void this.router.navigate(['geolocation']);
    this.closeMenu();
  }

  private closeMenu(): void {
    this.appMenu.close();
  }
}
