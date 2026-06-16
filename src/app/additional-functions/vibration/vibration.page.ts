import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Vibration } from '@awesome-cordova-plugins/vibration';

@Component({
  selector: 'app-vibration',
  templateUrl: './vibration.page.html',
  styleUrls: ['./vibration.page.scss'],
  imports: [IonicModule],
})
export class VibrationPage {
  vibratePattern(): void {
    Vibration.vibrate([2000, 1000, 500]);
  }

  vibrate(): void {
    Vibration.vibrate(2000);
  }
}
