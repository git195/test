import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { elementDesignTypes } from 'src/app/core/constants/element-design-types';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { templateElementOptions } from 'src/app/core/constants/template-element-options';
import { ValidatorFn } from '@angular/forms';
import { NumberService } from 'src/app/core/services/number.service';

export class Date extends ElementBase<string> {
    private _description : string;
    public get description() : string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    private _isRequired : boolean;
    public get isRequired() : boolean {
        return this._isRequired;
    }
    public set isRequired(value: boolean) {
        this._isRequired = value;
    }

    private _label : string;
    public get label() : string {
        return this._label;
    }
    public set label(value: string) {
        this._label = value;
    }

    private _placeholder : string;
    public get placeholder() : string {
        return this._placeholder;
    }
    public set placeholder(value: string) {
        this._placeholder = value;
    }

    private _value : string;
    public get value() : string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }

    constructor(options: ElementOptions<string>, elementType: ElementType) {
        super(options);
        this.description = options.description;
        this.isRequired = options.isRequired;
        this.label = options.label;
        this.placeholder = options.placeholder;
        this.type = elementType;
        this.value = options.value;
    }

    addValidators(formValidationService: FormValidationService, validators: Array<ValidatorFn>): void {
        formValidationService.addRequiredValidator(this.isRequired, validators);
    }

    static createInstance(formValidationService: FormValidationService, key: string, numberService: NumberService, template: {}): Date {
        const isDate = template[elementDesign.type] === elementDesignTypes.date;
        const isDateTime = template[elementDesign.type] === elementDesignTypes.dateTime;
        const isTime = template[elementDesign.type] === elementDesignTypes.time;

        let date = new Date({
            description: template[elementDesign.description],
            isRequired: template[elementDesign.required] && template[elementDesign.mandatoryOperator] === templateElementOptions.always,
            isVisible: template[elementDesign.isShow],
            key: key,
            label: template[elementDesign.label],
            order: numberService.toNumber(template),
            placeholder: template[elementDesign.placeholder]
        },
        isDate ? ElementType.Date : isDateTime ? ElementType.DateTime : ElementType.Time);

        date.value = isTime ?
            formValidationService.getDefaultTimeValue(template[elementDesign.defaultValue]) :
            formValidationService.getDefaultDateValue(template[elementDesign.defaultValue]);
        
        return date;
    }
}