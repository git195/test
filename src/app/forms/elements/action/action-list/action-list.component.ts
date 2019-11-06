import { Action } from '../action';
import { Action as ActionInterface } from 'src/app/core/interfaces/action';
import { ActionService } from 'src/app/core/services/action.service';
import { ActivatedRoute } from '@angular/router';
import { AlertButton } from '@ionic/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { colours } from 'src/app/core/constants/colour';
import { Component, Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../../element-component';
import { events } from 'src/app/core/constants/events';
import { Events, NavController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { messages } from 'src/app/core/constants/messages';
import { routes } from 'src/app/core/constants/routes';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-action',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss'],
})
export class ActionListComponent implements OnInit, ElementComponentBase<Action> {
  @Input() formGroup: FormGroup;

  actions: Array<ActionInterface>
  element: Action;

  constructor(
    private actionService: ActionService,
    private alertService: AlertService,
    private events: Events,
    private nav: NavController,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.events.subscribe(events.actionsUpdated, () => {
      this.actions = this.actionService.getActions();

      if (this.actions.length === 0) {
        this.actions = undefined;
      }
    });
  }

  async deleteAction(actionIndex: number): Promise<void> {
    const buttons: Array<AlertButton> = [
      {
        text: 'Cancel'
      }, {
        text: 'Delete',
        handler: async () => {
          this.actionService.deleteAction(actionIndex);
          await this.toastService.presentToast(colours.success, messages.form.actionDeleteSuccessful, true, 'bottom');
        }
      }
    ]

    await this.alertService.presentAlert(buttons, messages.alert.actionDelete);
  }

  async editAction(actionIndex: number): Promise<void> {
    this.actionService.currentActionIndex = actionIndex;
    const moduleId = +this.route.snapshot.queryParamMap.get('moduleId');
    await this.nav.navigateForward(routes.actionForm, { queryParams: { moduleId: moduleId } });
  }
}
