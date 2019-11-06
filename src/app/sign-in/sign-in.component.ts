import { BearerToken } from '../core/interfaces/bearer-token';
import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../core/interfaces/current-user';
import { CurrentUserService } from '../core/services/current-user.service';
import { events } from '../core/constants/events';
import { Events, MenuController, NavController } from '@ionic/angular';
import { LoadingService } from '../core/services/loading.service';
import { messages } from '../core/constants/messages';
import { Network } from '@ngx-pwa/offline';
import { routes } from '../core/constants/routes';
import { SignIn } from './sign-in';
import { SignInService } from './sign-in.service';
import { storage } from '../core/constants/storage';
import { StorageService } from '../core/services/storage.service';
import { StringService } from '../core/services/string.service';
import { Subscription } from 'rxjs';
import { ToastService } from '../core/services/toast.service';
import { colours } from '../core/constants/colour';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  showForm = false;

  signIn: SignIn = {
    password: '',
    username: '',
  };

  private loginSubscription: Subscription;

  constructor(
    private currentUserService: CurrentUserService,
    private signInService: SignInService,
    private stringService: StringService,
    private storageService: StorageService,
    private events: Events,
    private loadingService: LoadingService,
    private menu: MenuController,
    private nav: NavController,
    private network: Network,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    await this.menu.enable(false);
    await this.loadingService.presentLoading();
    this.showForm = true;

    if (this.network.online) {
      this.loadingService.dismissLoading();
      return;
    }
    
    const username: string = await this.storageService.getLastSignedInUser();

    if (this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(username)) {
      this.toastService.presentToast(colours.danger, messages.signIn.pleaseSignIn);
      return;
    }

    let currentUser: CurrentUser = await this.storageService.getUserConfig(username);

    if (currentUser === null) {
      this.toastService.presentToast(colours.danger, messages.signIn.pleaseSignIn);
      return;
    }

    this.currentUserService.setCurrentUser(currentUser, username);
    this.events.publish(events.userSignedIn);
    
    await this.nav.navigateRoot(routes.modules);
  }

  async ionViewDidEnter() {
    await this.loadingService.dismissLoading();
  }

  async navigateToModules(): Promise<void> {
    if (!this.network.online) {
      await this.ngOnInit();
      return;
    }

    await this.loadingService.presentLoading(messages.signIn.signingIn);

    this.loginSubscription = this.signInService.signIn(this.signIn).subscribe(
      async (token: BearerToken) => {
        this.currentUserService.setBearerToken(token, this.signIn.username);
        this.events.publish(events.userSignedIn);

        this.storageService.setValues([
          {
            key: storage.key.lastSignedInUser,
            value: this.signIn.username
          },
          {
            key: storage.key.lastSignedInUserBearerToken,
            value: token.access_token
          },
          {
            key: storage.key.lastSignedInUserExpireDateTime,
            value: token.expires_in
          }
        ]);

        await this.nav.navigateRoot(routes.modules);
      },
      async (error: string) => {
        await this.toastService.presentToast(colours.danger, error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loginSubscription !== undefined){
      this.loginSubscription.unsubscribe();
    }
  }
}
