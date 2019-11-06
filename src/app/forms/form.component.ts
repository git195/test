import * as _ from 'lodash';
import { ActionProperty } from '../core/interfaces/action-property';
import { ActionService } from '../core/services/action.service';
import { Answer } from '../core/interfaces/answer';
import { AttachmentService } from '../core/services/attachment.service';
import { colours } from '../core/constants/colour';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CurrentUser } from '../core/interfaces/current-user';
import { CurrentUserService } from '../core/services/current-user.service';
import { duration } from '../core/constants/duration';
import { ElementBase } from './elements/element-base';
import { elementDesignTypes } from '../core/constants/element-design-types';
import { ElementType } from '../core/enumerations/element-type';
import { events } from '../core/constants/events';
import { Events, MenuController, NavController } from '@ionic/angular';
import { FormAnswer } from '../core/interfaces/form-answer';
import { FormAnswerResponse } from '../core/interfaces/form-answer-response';
import { FormElementService } from '../core/services/form-element.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../core/services/form.service';
import { FormType } from '../core/enumerations/form-type';
import { LoadingService } from '../core/services/loading.service';
import { messages } from '../core/constants/messages';
import { ModuleTemplates } from '../core/interfaces/module-templates';
import { ModuleTemplateService } from '../core/services/module-template.service';
import { Network } from '@ngx-pwa/offline';
import { NumberService } from '../core/services/number.service';
import { routes } from '../core/constants/routes';
import { StorageService } from '../core/services/storage.service';
import { StringService } from '../core/services/string.service';
import { Subscription } from 'rxjs';
import { Template } from '../core/interfaces/template';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-forms',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() formType: FormType;
  @Input() moduleId: number;

  @Output() setActionElementExists = new EventEmitter<boolean>();
  @Output() setAttachmentElementExists = new EventEmitter<boolean>();
  @Output() setModuleName = new EventEmitter<string>();

  @ViewChild('content') private content: any;

  formGroup: FormGroup;
  isSubmitted: boolean;
  template: Template;

  private actionFormsAnswerSubscription: Subscription;
  private elements: Array<ElementBase<any>>;
  private formAnswerSubscription: Subscription;

  constructor(
    private actionService: ActionService,
    private attachmentService: AttachmentService,
    private currentUserService: CurrentUserService,
    private events: Events,
    private formElementService: FormElementService,
    private formService: FormService,
    private loadingService: LoadingService,
    private menu: MenuController,
    private moduleTemplateService: ModuleTemplateService,
    private nav: NavController,
    private network: Network,
    private numberService: NumberService,
    private storageService: StorageService,
    private stringService: StringService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    if (!this.actionService.isNavigatingToModules) {
      await this.loadingService.presentLoading();
    }

    if (this.currentUserService.hasNotBeenSet) {
      const username: string = await this.storageService.getLastSignedInUser();

      if (this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(username)) {
        await this.nav.navigateRoot(routes.signIn);
        return;
      }

      let currentUser: CurrentUser = await this.storageService.getUserConfig(username);

      this.currentUserService.account = currentUser.account;
      this.currentUserService.setCurrentUser(currentUser, username);
      this.events.publish(events.userSignedIn);

      await this.menu.enable(true);
    }

    let templateDesign: Array<any> = await this.getTemplateDesign();

    this.elements = this.moduleTemplateService.toElements(templateDesign);

    this.formGroup = this.actionService.isEditingAction ?
      this.actionService.getActionFormGroup() :
      this.formElementService.toFormGroup(this.elements);

    if (this.formType === FormType.FormOne) {
      this.actionService.parentFormGroup = this.formGroup;
    } else if (this.formType === FormType.ActionForm) {
      this.actionService.actionElements = this.elements;
    }
    this.setActionElementExists.emit(
      this.moduleTemplateService.typeExists(templateDesign, elementDesignTypes.action)
    );

    this.setAttachmentElementExists.emit(
      this.moduleTemplateService.typeExists(templateDesign, elementDesignTypes.attachment)
    );

    await this.loadingService.dismissLoading();
  }

  async onSubmit() {
    this.isSubmitted = true;

    if (!this.formGroup.valid) {
      await this.content.scrollToTop(duration[1000]);
      return;
    }

    await this.loadingService.presentLoading();

    switch (this.formType) {

      case FormType.ActionForm:
        await this.storeAction();
        break;

      case FormType.FormOne:

        const actionFormsAnswer: Array<Array<ActionProperty>> = this.formElementService.toActionFormsAnswer();
        const formAnswer: FormAnswer = this.formElementService.toFormAnswer(this.elements, this.formGroup, this.template.id);
        if (this.network.online) {
          this.postAnswer(actionFormsAnswer, formAnswer);
          return;
        }
        this.storeAnswerLocally(actionFormsAnswer, formAnswer);
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.actionFormsAnswerSubscription !== undefined) {
      this.actionFormsAnswerSubscription.unsubscribe();
    }

    if (this.formAnswerSubscription !== undefined) {
      this.formAnswerSubscription.unsubscribe();
    }
  }

  private async getTemplateDesign(): Promise<Array<any>> {
    if (this.numberService.isNullOrUndefinedOrZero(this.moduleId)) {
      return undefined;
    }

    const moduleTemplate: ModuleTemplates = _.chain(this.currentUserService.modulesTemplates)
      .filter(mt => mt.moduleID === this.moduleId)
      .head()
      .value();

    this.actionService.actionTemplateId = moduleTemplate.actionTemplateID;

    switch (this.formType) {

      case FormType.ActionForm:
        return JSON.parse(moduleTemplate.actionTemplate);

      case FormType.FormOne:
        if (moduleTemplate.templates.length < 1) {
          await this.nav.navigateBack(routes.modules);
          await this.toastService.presentToast(colours.danger, messages.modules.noFormOneExists);
          return undefined;
        }

        this.template = _.head(moduleTemplate.templates);
        this.setModuleName.emit(moduleTemplate.moduleName);
        return JSON.parse(this.template.designJson);

      default:
        return undefined;
    }
  }

  private async postAnswer(actionFormsAnswer: Array<Array<ActionProperty>>, formAnswer: FormAnswer): Promise<void> {

    this.formAnswerSubscription = this.formService.postFormAnswer(formAnswer).subscribe(
      async (response: FormAnswerResponse) => {
            this.attachmentService.uploadFiles(response,formAnswer);

        if (actionFormsAnswer.length > 0) {

          this.actionFormsAnswerSubscription = this.formService.postActionFormsAnswer(this.actionService.actionTemplateId, actionFormsAnswer, response.eventObj.id, response.formAnswer.id).subscribe(
            async (response: any) => {
              await this.nav.navigateBack(routes.modules);
              await this.toastService.presentToast(colours.success, messages.form.form1SaveSuccessful, true, 'bottom');
            },
            async (error: string) => {
              await this.toastService.presentToast(colours.danger, error);
            }
          );
        }

        if (formAnswer.answerData['attachment'] == undefined || actionFormsAnswer.length <= 0) {
          await this.nav.navigateBack(routes.modules);
          await this.toastService.presentToast(colours.success, messages.form.form1SaveSuccessful, true, 'bottom');
        }
      },
      async (error: string) => {
        await this.toastService.presentToast(colours.danger, error);
      }
    );
  }

  private async storeAction(): Promise<void> {
    this.actionService.storeAction(this.formGroup);
    await this.nav.navigateBack(routes.formOne, { queryParams: { moduleId: this.moduleId } });
    await this.toastService.presentToast(colours.success, messages.form.actionStoreSuccessful, true, 'bottom');
  }

  private async storeAnswerLocally(actionFormsAnswer: Array<Array<ActionProperty>>, formAnswer: FormAnswer): Promise<void> {

    let answers: Array<Answer> = await this.storageService.getAnswers(this.currentUserService.username);

    if (answers === null) {
      answers = new Array<Answer>();
    }

    const answer: Answer = {
      actionFormsAnswer: actionFormsAnswer,
      formAnswer: formAnswer
    }

    answers.push(answer);

    await this.storageService.setValue({
      key: this.storageService.answerKey,
      value: JSON.stringify(answers)
    });

    await this.nav.navigateBack(routes.modules);
    await this.toastService.presentToast(colours.success, messages.form.form1SaveSuccessfulAndWillSyncWhenBackOnline, true, 'bottom');
  }
}