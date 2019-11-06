import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
    } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { mergeMap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class HeaderInterceptor implements HttpInterceptor {
    constructor(private storageService: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/api/')) {
            return this.storageService.getLastSignedInUserBearerToken()
                .pipe(
                    mergeMap((bearerToken: string) => {
                        const headers: HttpHeaders = req.headers.set('Authorization', `Bearer ${bearerToken}`);
                        const authReq: HttpRequest<any> = req.clone({ headers });
                        return next.handle(authReq);
                    })
                );
        }

        return next.handle(req);
    }
}