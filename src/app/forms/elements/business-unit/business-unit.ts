import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NumberService } from 'src/app/core/services/number.service';
import { templateElementOptions } from 'src/app/core/constants/template-element-options';
import { ValidatorFn } from '@angular/forms';
import { ReportingStructureLevel } from 'src/app/core/interfaces/reporting-structure-level';

export class BusinessUnit extends ElementBase<string> {
    private _description : string;
    public get description() : string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    public static get idKey() : string {
        return 'businessUnitIdKey';
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

    constructor(options: ElementOptions<string>) {
        super(options);
        this.description = options.description;
        this.isRequired = options.isRequired;
        this.label = options.label;
        this.placeholder = options.placeholder;
        this.type = ElementType.BusinessUnit;
    }

    addValidators(formValidationService: FormValidationService, validators: Array<ValidatorFn>): void {
        formValidationService.addRequiredValidator(this.isRequired, validators);
    }

    static createInstance(key: string, numberService: NumberService, template: {}): BusinessUnit {
        return new BusinessUnit({
            description: template[elementDesign.description],
            isRequired: template[elementDesign.required] && template[elementDesign.mandatoryOperator] === templateElementOptions.always,
            isVisible: template[elementDesign.isShow],
            key: key,
            label: template[elementDesign.label],
            order: numberService.toNumber(template),
            placeholder: 'Select a business unit'
        });
    }
}