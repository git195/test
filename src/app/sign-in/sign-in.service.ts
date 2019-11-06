import { BearerToken } from '../core/interfaces/bearer-token';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpService } from '../core/services/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignIn } from './sign-in';

@Injectable()
export class SignInService {
    constructor(private http: HttpClient, private httpService: HttpService) { }
    
    signIn(signIn: SignIn): Observable<BearerToken> {
        const options = {
            headers: new HttpHeaders({
                'content-type': 'application/x-www-form-urlencoded'
            })
        };

        let formData = `grant_type=password&password=${signIn.password}&username=${signIn.username}`;

        return this.http.post<BearerToken>(environment.baseUrl + 'oauth/token', formData, options)
            .pipe(
                catchError(this.httpService.handleError)
            );
    }
}