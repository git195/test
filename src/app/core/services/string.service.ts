import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class StringService {
    constructor() { }

    isNullOrUndefinedOrEmptyOrWhitespace(value: string): boolean {
        if (value === null || value === undefined || value === '' || value.trim() == '') {
            return true;
        }

        return false;
    }

    replacePeriodWithDash(value: string): string {
        if (this.isNullOrUndefinedOrEmptyOrWhitespace(value)) {
            return null;
        }

        return value.replace(/\./gi, '-');
    }

    replaceDashWithPeriod(value: string): string {
        if (this.isNullOrUndefinedOrEmptyOrWhitespace(value)) {
            return null;
        }

        return value.replace(/-/gi, '.');
    }
}