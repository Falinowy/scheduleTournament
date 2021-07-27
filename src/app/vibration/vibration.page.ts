import { Component } from '@angular/core';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'app-vibration',
  templateUrl: './vibration.page.html',
  styleUrls: ['./vibration.page.scss'],
})
export class VibrationPage {

  constructor() { }

  vibratePattern(){
    Vibration.vibrate([2000, 1000, 500]);
  }

  vibrate() {
    Vibration.vibrate(2000);
  }
}
