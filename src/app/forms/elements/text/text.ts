import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementOptionValidation } from 'src/app/core/interfaces/element-option-validation';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NumberService } from 'src/app/core/services/number.service';
import { templateElementOptions } from 'src/app/core/constants/template-element-options';
import { ValidatorFn } from '@angular/forms';

export class Text extends ElementBase<string> {
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

    private _validation : ElementOptionValidation;
    public get validation() : ElementOptionValidation {
        return this._validation;
    }
    public set validation(value: ElementOptionValidation) {
        this._validation = value;
    }

    private _value : string;
    public get value() : string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }

    constructor(options: ElementOptions<string>) {
        super(options);
        this.description = options.description;
        this.isRequired = options.isRequired;
        this.label = options.label;
        this.placeholder = options.placeholder;
        this.type = ElementType.Text;
        this.validation = options.validation;
        this.value = options.value;
    }

    addValidators(formValidationService: FormValidationService, validators: Array<ValidatorFn>): void {
        formValidationService.addMinimumLengthValidator(this.validation, validators);
        formValidationService.addRequiredValidator(this.isRequired, validators);
    }

    static createInstance(formValidationService: FormValidationService, key: string, numberService: NumberService, template: {}): Text {
        let text = new Text({
            description: template[elementDesign.description],
            isRequired: template[elementDesign.required] && template[elementDesign.mandatoryOperator] === templateElementOptions.always,
            isVisible: template[elementDesign.isShow],
            key: key,
            label: template[elementDesign.label],
            order: numberService.toNumber(template),
            placeholder: template[elementDesign.placeholder],
            validation: {
                maximumLength: template[elementDesign.maxLength],
                minimumLength: template[elementDesign.minLength]
            }
        });

        text.value = formValidationService.getDefaultTextValue(template[elementDesign.defaultValue], text.validation);
        return text;
    }
}