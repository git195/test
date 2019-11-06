import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './core/services/current-user.service';
import { events } from './core/constants/events';
import {
  Events,
  MenuController,
  NavController,
  Platform
  } from '@ionic/angular';
import { LoadingService } from './core/services/loading.service';
import { menu } from './core/constants/menu';
import { MenuItem } from './core/interfaces/menu-item';
import { messages } from './core/constants/messages';
import { routes } from './core/constants/routes';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './core/services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  menu: Array<MenuItem> = menu;
  username: string;

  constructor(
    private currentUserService: CurrentUserService,
    private events: Events,
    private loadingService: LoadingService,
    private menuController: MenuController,
    private nav: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService
  ) { }

  async ngOnInit(): Promise<void> {
    this.events.subscribe(events.userSignedIn, () => {
      this.username = this.currentUserService.username;
    });

    await this.initializeApp();
  }

  async initializeApp(): Promise<void> {
    await this.platform.ready();

    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }

  async signOut() {
    await this.loadingService.presentLoading(messages.signIn.signingOut);

    this.currentUserService.clear();
    await this.storageService.clearLastSignedInUser();

    this.menuController.enable(false);
    this.nav.navigateRoot(routes.signIn);
  }
}
