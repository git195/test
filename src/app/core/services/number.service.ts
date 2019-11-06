import { elementDesign } from '../constants/element-design';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NumberService {
    constructor() { }

    isNullOrUndefinedOrZero(value: number): boolean {
        if (value === null || value === undefined || value === 0) {
            return true;
        }

        return false;
    }

    toNumber(template: {}): number {
        return +`${template[elementDesign.row]}.${template[elementDesign.col]}`;
    }
}