import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast: HTMLIonToastElement;

  constructor(public loadingService: LoadingService, public toastController: ToastController) { }

  async presentToast(colour: string, message: string, dismissLoading: boolean = true, position: 'top' | 'bottom' | 'middle' = 'top'): Promise<void> {
    this.toast = await this.toastController.create({
      animated: true,
      color: colour,
      duration: 5000,
      message: message,
      position: position,
      showCloseButton: true
    });

    if (dismissLoading) {
      await this.loadingService.dismissLoading();
    }

    await this.toast.present();
  }

  async dismissToast(): Promise<void> {
    await this.toast.dismiss();
  }
}