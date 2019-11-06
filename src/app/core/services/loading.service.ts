import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    loading: HTMLIonLoadingElement;

    constructor(public loadingController: LoadingController) { }

    async presentLoading(message = 'Please wait...'): Promise<void> {
        this.loading = await this.loadingController.create({
            message: message
        });

        await this.loading.present();
    }

    async dismissLoading(): Promise<void> {
        if (this.loading === undefined) {
            return;
        }

        await this.loading.dismiss();
    }
}