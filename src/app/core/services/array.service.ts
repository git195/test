import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ArrayService {
    constructor() { }

    isNotNullAndNotUndefinedAndNotEmpty(value: Array<any>): boolean {
        if (value !== null && value !== undefined && value.length > 0) {
            return true;
        }

        return false;
    }
}