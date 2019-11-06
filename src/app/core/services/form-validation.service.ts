import * as moment from 'moment';
import { defaultValue } from '../constants/default-value';
import { ElementOptionValidation } from '../interfaces/element-option-validation';
import { Injectable } from '@angular/core';
import { Moment } from 'moment';
import { ValidatorFn, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {
    constructor() { }

    addMaximumValueValidator(validation: ElementOptionValidation, validators: Array<ValidatorFn>): void {
        if (validation && validation.maximumValue) {
            validators.push(Validators.max(validation.maximumValue));
        }
    }
    
    addMinimumLengthValidator(validation: ElementOptionValidation, validators: Array<ValidatorFn>): void {
        if (validation && validation.minimumLength) {
            validators.push(Validators.minLength(validation.minimumLength));
        }
    }

    addMinimumValueValidator(validation: ElementOptionValidation, validators: Array<ValidatorFn>): void {
        if (validation && validation.minimumValue) {
            validators.push(Validators.min(validation.minimumValue));
        }
    }

    addRequiredValidator(isRequired: boolean, validators: Array<ValidatorFn>): void {
        if (isRequired) {
            validators.push(Validators.required);
        }
    }

    getDefaultDateValue(defaultDateValue: string): string {
        if (defaultDateValue === defaultValue.date.today) {
            return moment().toISOString(true);
        }
        
        return null;
    }

    getDefaultTextValue(defaultValue: string, validation: ElementOptionValidation): string {
        if (defaultValue && validation.maximumLength && defaultValue.length > validation.maximumLength) {
             return defaultValue.slice(0, validation.maximumLength);
        }
        
        return defaultValue;
    }

    getDefaultTimeValue(defaultTimeValue: string): string {
        if (defaultTimeValue === defaultValue.time.now) {
            return moment().toISOString(true);
        }
        
        return null;
    }

    getMaximumLength(validation: ElementOptionValidation): number {
        if (validation && validation.maximumLength) {
            return validation.maximumLength;
        }

        return undefined;
    }
    
    getMaximumValue(validation: ElementOptionValidation): number {
        if (validation && validation.maximumValue) {
            return validation.maximumValue;
        }

        return undefined;
    } 

    getMinimumValue(validation: ElementOptionValidation): number {
        if (validation && validation.minimumValue) {
            return validation.minimumValue;
        }

        return undefined;
    }

    getValidCurrency(targetValue: string): string {
        const currencySplit: string[] = targetValue.split('.');

        if (currencySplit.length > 1) {
            let decimalPart: string = currencySplit[1];
            
            if (decimalPart.length > 2) {
                decimalPart = decimalPart.slice(0, 2);
                return `${currencySplit[0]}.${decimalPart}`;
            }

            return targetValue;
        }

        return targetValue;
    }

    getValidInteger(targetValue: string): string {
        const integerSplit: string[] = targetValue.split('.');

        if (integerSplit.length > 1) {
            return integerSplit[0];
        }

        return targetValue;
    }
}