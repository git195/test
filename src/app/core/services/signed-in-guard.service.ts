import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { CurrentUserService } from './current-user.service';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Network } from '@ngx-pwa/offline';
import { routes } from '../constants/routes';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class SignedInGuard implements CanActivate {
    constructor(
        private currentUserService: CurrentUserService,
        private nav: NavController,
        private network: Network,
        private storageService: StorageService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.currentUserService.hasNotBeenSet) {
            this.currentUserService.bearerToken = await this.storageService.getLastSignedInUserBearerToken().toPromise();
            this.currentUserService.expiresInSeconds = await this.storageService.getLastSignedInUserExpireDateTime();
        }

        if (this.network.online && !this.currentUserService.isSignedIn) {
            this.nav.navigateRoot(routes.signIn);
            return false;
        }

        return true;
    }
}