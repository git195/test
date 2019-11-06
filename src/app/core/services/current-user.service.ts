import * as moment from 'moment';
import { BearerToken } from '../interfaces/bearer-token';
import { catchError } from 'rxjs/operators';
import { CurrentAccount } from '../interfaces/account';
import { CurrentUser } from '../interfaces/current-user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { ModuleTemplates } from '../interfaces/module-templates';
import { Moment } from 'moment';
import { Observable } from 'rxjs';
import { ReportingStructureLevel } from '../interfaces/reporting-structure-level';
import { StringService } from './string.service';

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {
    private _account: CurrentAccount;
    get account(): CurrentAccount {
        return this._account;
    }
    set account(value: CurrentAccount) {
        this._account = {
            accountID: value.accountID,
            personID: value.personID,
            userID: value.userID
        };
    }

    private _accountName: string;
    get accountName(): string {
        return this._accountName;
    }
    set accountName(value: string) {
        this._accountName = value;
    }

    private _bearerToken: string;
    get bearerToken(): string {
        return this._bearerToken;
    }
    set bearerToken(value: string) {
        this._bearerToken = value;
    }

    get hasBeenSet(): boolean {
        return !this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(this.username);
    }

    get hasNotBeenSet(): boolean {
        return this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(this.username);
    }

    private _expireDateTime: Moment;
    get isSignedIn(): boolean {
        let isExpired = moment().isAfter(moment(this._expireDateTime));
        return this._bearerToken && !isExpired;
    }
    set expiresInSeconds(value: number) {
        this._expireDateTime = moment().add(value, 's');
    }
    
    private _modulesTemplates: Array<ModuleTemplates>;
    get modulesTemplates(): Array<ModuleTemplates> {
        return this._modulesTemplates;
    }
    set modulesTemplates(value: Array<ModuleTemplates>) {
        this._modulesTemplates = value;
    }

    private _reportingStructure: Array<ReportingStructureLevel>;
    get reportingStructure(): Array<ReportingStructureLevel> {
        return this._reportingStructure;
    }
    set reportingStructure(value: Array<ReportingStructureLevel>) {
        this._reportingStructure = value;
    }

    private _username: string;
    get username(): string {
        return this._username;
    }
    set username(value: string) {
        this._username = value;
    }

    constructor (
        private http: HttpClient,
        private httpService: HttpService,
        private stringService: StringService
    ) { }

    clear() {
        this.account = {
            accountID: null,
            personID: null,
            userID: null
        };
        
        this.accountName = null;
        this.bearerToken = null;
        this.expiresInSeconds = null;
        this.modulesTemplates = null;
        this.username = null;
    }

    getCurrentUser(): Observable<CurrentUser> {
        return this.http.get<CurrentUser>(`${environment.baseUrl}api/users/current/${this.username}`)
            .pipe(
                catchError(this.httpService.handleError)
            );
    }

    setBearerToken(token: BearerToken, username: string) {
        this.bearerToken = token.access_token;
        this.expiresInSeconds = token.expires_in;
        this.username = username;
    }

    setCurrentUser(currentUser: CurrentUser, username?: string) {
        this.accountName = currentUser.accountName;
        this.modulesTemplates = currentUser.modulesTemplates;
        this.reportingStructure = currentUser.reportingStructure;
        this.username = username === undefined ? this.username : username;
    }
}