import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/forms/elements/popover/popover.component';

@Injectable({
    providedIn: 'root'
})
export class PopoverService {
    popover : HTMLIonPopoverElement;

    constructor(public popoverController: PopoverController) { }

    async presentPopover(description: string, event: any): Promise<void> {
        this.popover = await this.popoverController.create({
            component: PopoverComponent,
            componentProps: { description: description },
            event: event
        });

        await this.popover.present();
    }

    async dismissPopover(): Promise<void> {
        await this.popover.dismiss();
    }
}