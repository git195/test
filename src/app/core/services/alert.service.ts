import { AlertButton } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AlertService {
    alert: HTMLIonAlertElement;

    constructor(public alertController: AlertController) { }

    async presentAlert(buttons: Array<AlertButton>, message: string): Promise<void> {
        this.alert = await this.alertController.create({
            buttons: buttons,
            message: message
        });

        await this.alert.present();
    }
}