import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage {
  latitude: number;
  longitude: number;
  constructor() { }

  getGeolocation() {
    Geolocation.getCurrentPosition().then((date => {
      this.latitude = date.coords.latitude;
      this.longitude = date.coords.longitude;
    }));
  }

}
