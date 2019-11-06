import { ActionService } from '../core/services/action.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormType } from '../core/enumerations/form-type';
import { NavController } from '@ionic/angular';
import { routes } from '../core/constants/routes';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.scss'],
})
export class FormOneComponent implements OnInit {
  formType: FormType;
  moduleId: number;
  moduleName: string;
  showAction: boolean;
  showAttachment: boolean;
  showFooter: boolean;

  constructor(private actionService: ActionService, private nav: NavController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.formType = FormType.FormOne;
    this.moduleId = +this.route.snapshot.queryParamMap.get('moduleId');
  }

  async navigateToActionForm() {
    this.actionService.currentActionIndex = undefined;
    await this.nav.navigateForward(routes.actionForm, { queryParams: { moduleId: this.moduleId } });
  }

  onSetActionElementExists(exists: boolean): void {
    this.showAction = exists;
    this.showFooter = true;
  }

  onSetAttachmentElementExists(exists: boolean): void {
    // this.showAttachment = exists;
    this.showAttachment = true;
    this.showFooter = true;
  }

  onSetModuleName(moduleName: string): void {
    this.moduleName = moduleName;
  }
}
