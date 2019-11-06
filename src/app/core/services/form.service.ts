import { Accept } from '../enumerations/accept';
import { ActionProperty } from '../interfaces/action-property';
import { catchError } from 'rxjs/operators';
import { contentType } from '../constants/content-type';
import { CurrentUserService } from './current-user.service';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';
import { FormAnswer } from '../interfaces/form-answer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { httpHeaders } from '../constants/http-headers';
import { HttpOption } from '../interfaces/http-option';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { systems } from '../constants/system';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    constructor(
        private currentUserService: CurrentUserService,
        private http: HttpClient,
        private httpService: HttpService
    ) { }

    postFormAnswer(answer: FormAnswer): Observable<any> {
        const options: HttpOption = {
            headers: new HttpHeaders()
                .set(httpHeaders.contentType, contentType.applicationJson)
                .set(httpHeaders.currentAccount, JSON.stringify(this.currentUserService.account))
                .set(httpHeaders.currentSystemID, systems.safety.toString())
        };

        const url = `${environment.baseUrl}api/formanswers/create?eventId=0&linkToken=null`;

        return this.http.post<any>(url, JSON.stringify(answer), options)
            .pipe(
                catchError(this.httpService.handleError),
        );
    }

    postActionFormsAnswer(actionTemplateId: number, answer: Array<Array<ActionProperty>>, eventId: number, formAnswerId: number): Observable<any> {
        const options: HttpOption = {
            headers: new HttpHeaders()
                .set(httpHeaders.accept, Accept.Any)
                .set(httpHeaders.contentType, `${contentType.applicationJson}; ${contentType.charsetUTF8}`)
                .set(httpHeaders.currentAccount, JSON.stringify(this.currentUserService.account))
                .set(httpHeaders.currentSystemID, systems.safety.toString())
        };

        const url = `${environment.baseUrl}api/formanswerstask/createtasks?formDesignId=${actionTemplateId}&formAnswerId=${formAnswerId}&eventId=${eventId}&personId=null&eventStatus=undefined&isDraft=false&isNewRecord=true`;

        return this.http.post<any>(url, JSON.stringify(answer), options)
            .pipe(
                catchError(this.httpService.handleError)
            );
    }

    uploadAttachments(attachmentData: FormData): Observable<any> {
        const options: HttpOption = {
            headers: new HttpHeaders()
                .set(httpHeaders.currentAccount, JSON.stringify(this.currentUserService.account))
                .set(httpHeaders.currentSystemID, systems.safety.toString())
        };

        const url: string = `${environment.baseUrl}api/formanswers/uploadfile`;

        return this.http.post<any>(url, attachmentData, options)
            .pipe(
                catchError(this.httpService.handleError)
            );
    }
}