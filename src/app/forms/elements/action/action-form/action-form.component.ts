import { ActionService } from 'src/app/core/services/action.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormType } from 'src/app/core/enumerations/form-type';
import { NavController } from '@ionic/angular';
import { routes } from 'src/app/core/constants/routes';

@Component({
  selector: 'app-action-form',
  templateUrl: './action-form.component.html',
  styleUrls: ['./action-form.component.scss'],
})
export class ActionFormComponent implements OnInit {
  formType: FormType;
  moduleId: number;
  title: string;

  constructor(private actionService: ActionService, private nav: NavController, private route: ActivatedRoute) { }

  async ngOnInit() {
    if (this.actionService.actionElement === undefined) {
      this.actionService.isNavigatingToModules = true;
      await this.nav.navigateRoot(routes.modules);
      return;
    }

    this.moduleId = +this.route.snapshot.queryParamMap.get('moduleId');
    this.formType = FormType.ActionForm;
    this.title = this.actionService.actionElement.label;
  }
}
