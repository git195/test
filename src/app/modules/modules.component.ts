import * as _ from 'lodash';
import { ActionService } from '../core/services/action.service';
import { Answer } from '../core/interfaces/answer';
import { AttachmentService } from '../core/services/attachment.service';
import { colours } from '../core/constants/colour';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentUser } from '../core/interfaces/current-user';
import { CurrentUserService } from '../core/services/current-user.service';
import { events } from '../core/constants/events';
import { Events, MenuController, NavController } from '@ionic/angular';
import { FormAnswerResponse } from '../core/interfaces/form-answer-response';
import { FormService } from '../core/services/form.service';
import { LoadingService } from '../core/services/loading.service';
import { messages } from '../core/constants/messages';
import { Module } from '../core/interfaces/module';
import { Network } from '@ngx-pwa/offline';
import { routes } from '../core/constants/routes';
import { StorageService } from '../core/services/storage.service';
import { StringService } from '../core/services/string.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../core/services/toast.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent implements OnInit, OnDestroy {
  modules: Array<Module>;
  accountName: string;

  private actionFormsAnswerSubscription: Subscription;
  private currentUserSubscription: Subscription;
  private formAnswerSubscription: Subscription;

  constructor(
    private actionService: ActionService,
    private attachmentService: AttachmentService,
    private currentUserService: CurrentUserService,
    private events: Events,
    private formService: FormService,
    private loadingService: LoadingService,
    private menu: MenuController,
    private nav: NavController,
    private network: Network,
    private storageService: StorageService,
    private stringService: StringService,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.actionService.isNavigatingToModules = false;

    await this.loadingService.dismissLoading();
    await this.loadingService.presentLoading();

    if (this.network.online && this.currentUserService.hasBeenSet) {
      await this.initialiseOnline();
      return;
    }

    let username: string = await this.storageService.getLastSignedInUser();

    if (this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(username)) {
      await this.loadingService.dismissLoading();
      await this.nav.navigateRoot(routes.signIn);
      return;
    }

    await this.initaliseOffline(username);
  }

  async navigateToFormOne(moduleId: number) {
    await this.nav.navigateForward(routes.formOne, { queryParams: { moduleId: moduleId } });
  }

  ngOnDestroy() {
    if (this.actionFormsAnswerSubscription !== undefined) {
      this.actionFormsAnswerSubscription.unsubscribe();
    }

    if (this.currentUserSubscription !== undefined) {
      this.currentUserSubscription.unsubscribe();
    }

    if (this.formAnswerSubscription !== undefined) {
      this.formAnswerSubscription.unsubscribe();
    }
  }

  private getModules(): Array<Module> {
    return _.chain(this.currentUserService.modulesTemplates)
      .map(m => {
        let module: Module = {
          moduleIconClass: m.moduleIconClass,
          moduleID: m.moduleID,
          moduleName: m.moduleName
        };
        return module;
      })
      .value();
  }

  private async initaliseOffline(username: string): Promise<void> {
    let currentUser: CurrentUser = await this.storageService.getUserConfig(username);

    this.currentUserService.setCurrentUser(currentUser, username);
    this.events.publish(events.userSignedIn);

    this.accountName = currentUser.accountName;
    this.modules = this.getModules();

    await this.loadingService.dismissLoading();
    await this.menu.enable(true);
    await this.subscribeToAnswersSync();
  }

  private async initialiseOnline(): Promise<void> {
    this.currentUserSubscription = this.currentUserService.getCurrentUser().subscribe(
      async (currentUser: CurrentUser) => {
        this.currentUserService.account = currentUser.account;
        this.currentUserService.setCurrentUser(currentUser);

        await this.storageService.setValue({
          key: this.storageService.userConfigKey,
          value: JSON.stringify(currentUser)
        });

        this.accountName = currentUser.accountName;
        this.modules = this.getModules();

        await this.loadingService.dismissLoading();
        await this.menu.enable(true);
        await this.subscribeToAnswersSync();
      },
      async (error: string) => {
        if (error === messages.signIn.pleaseTrySigningInLater) {
          await this.nav.navigateRoot(routes.signIn);
        }

        await this.loadingService.dismissLoading();
        await this.toastService.presentToast(colours.danger, error);
      }
    );
  }

  private async subscribeToAnswersSync() {
    this.network.onlineChanges.subscribe(
      async (online: boolean) => {
        if (online) {
          let answers: Array<Answer> = await this.storageService.getAnswers(this.currentUserService.username);

          if (answers === null) {
            return;
          }

          await this.loadingService.presentLoading(messages.form.syncingForm1s);

          answers.forEach(a => {
            this.formAnswerSubscription = this.formService.postFormAnswer(a.formAnswer).subscribe(
              async (response: FormAnswerResponse) => {

                this.attachmentService.uploadStoredFiles(response, a.formAnswer);

                if (a.actionFormsAnswer.length > 0) {
                  this.actionFormsAnswerSubscription = this.formService.postActionFormsAnswer(this.actionService.actionTemplateId, a.actionFormsAnswer, response.eventObj.id, response.formAnswer.id).subscribe(
                    async (response: any) => {
                      await this.storageService.setValue({
                        key: this.storageService.answerKey,
                        value: ''
                      });

                      await this.loadingService.dismissLoading();
                      await this.toastService.presentToast(colours.success, messages.form.form1sSyncSuccessful, true, 'bottom');
                    },
                    async (error: string) => {
                      await this.toastService.presentToast(colours.danger, error);
                    }
                  );
                } else {
                  await this.storageService.setValue({
                    key: this.storageService.answerKey,
                    value: ''
                  });

                  await this.loadingService.dismissLoading();
                  await this.toastService.presentToast(colours.success, messages.form.form1sSyncSuccessful, true, 'bottom');
                }
              },
              async (error: string) => {
                await this.loadingService.dismissLoading();
                await this.toastService.presentToast(colours.danger, error);
              }
            );
          });
        }
      },
      async (error: string) => {
        await this.loadingService.dismissLoading();
        await this.toastService.presentToast(colours.danger, error);
      }
    );
  }





}