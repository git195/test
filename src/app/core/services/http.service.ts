import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { messages } from '../constants/messages';
import { Observable, throwError } from 'rxjs';
import { exceptionType } from '../constants/exception-type';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor() { }

    handleError(err: HttpErrorResponse): Observable<never> {
        if (err.error.error === 'invalid_grant') {
            return throwError(err.error.error_description);
        }

        if (err.error.exceptionType &&
            (err.error.exceptionType.includes(exceptionType.userAccountAccessException) || err.error.exceptionType.includes(exceptionType.reportingStructureException))
        ) {
            return throwError(messages.signIn.pleaseTrySigningInLater);
        }

        return throwError(err.error.message === null ? err.error : err.error.message);
    }
}