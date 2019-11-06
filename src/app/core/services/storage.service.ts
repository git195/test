import { Answer } from '../interfaces/answer';
import { CurrentUser } from '../interfaces/current-user';
import { CurrentUserService } from './current-user.service';
import { FormAnswer } from '../interfaces/form-answer';
import { from, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';
import { storage } from '../constants/storage';
import { Storage } from '@ionic/storage';
import { StringService } from './string.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    get answerKey(): string {
        return this.getAnswerKey(this.currentUserService.username);
    }

    get userConfigKey(): string {
        return this.getUserConfigKey(this.currentUserService.username);
    }

    constructor(
        private currentUserService: CurrentUserService,
        private storage: Storage,
        private stringService: StringService
    ) { }

    clearLastSignedInUser(): void {
        this.setValues([
            {
                key: storage.key.lastSignedInUser,
                value: ''
            },
            {
                key: storage.key.lastSignedInUserBearerToken,
                value: ''
            },
            {
                key: storage.key.lastSignedInUserExpireDateTime,
                value: ''
            }
        ]);
    }

    async getAnswers(username: string): Promise<Array<Answer>> {
        let answerKey: string = this.getAnswerKey(username);
        let answers: any = await this.storage.get(answerKey);

        if (this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(answers)) {
            return null;
        }

        return <Array<Answer>>JSON.parse(answers);
    }

    getAnswerKey(username: string): string {
        return username + storage.keySuffix.answer;
    }

    getLastSignedInUserBearerToken(): Observable<string> {
        return from(this.storage.get(storage.key.lastSignedInUserBearerToken));
    }

    getLastSignedInUserExpireDateTime(): Promise<any> {
        return this.storage.get(storage.key.lastSignedInUserExpireDateTime);
    }

    getLastSignedInUser(): Promise<any> {
        return this.storage.get(storage.key.lastSignedInUser);
    }

    async getUserConfig(username: string): Promise<CurrentUser> {
        let userConfigKey: string = this.getUserConfigKey(username);
        let currentUserConfig: any = await this.storage.get(userConfigKey);

        if (this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(currentUserConfig)) {
            return null;
        }

        return <CurrentUser>JSON.parse(currentUserConfig);
    }

    getUserConfigKey(username: string): string {
        return username + storage.keySuffix.userConfig;
    }

    setValue(keyValue: KeyValue<string, any>): Promise<any> {
        return this.storage.set(keyValue.key, keyValue.value);
    }

    setValues(keysValues: Array<KeyValue<string, any>>): void {
        keysValues.forEach(async (val, idx, arr) => {
            await this.storage.set(val.key, val.value);
        });
    }
}