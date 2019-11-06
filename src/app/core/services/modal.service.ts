import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { ModalController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    data: any;
    modal: HTMLIonModalElement;

    constructor(public loadingService: LoadingService, public modalController: ModalController) { }

    async dismissModal(data?: any): Promise<void> {
        await this.modalController.dismiss(data);
    }

    async presentModal(displayComponent: Function | HTMLElement | null | string): Promise<void> {
        this.modal = await this.modalController.create({
            component: displayComponent
        });

        await this.modal.present();
    }
}