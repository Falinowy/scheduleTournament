import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastCtrl = inject(ToastController);

  async showError(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }

  async showSuccess(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
}
