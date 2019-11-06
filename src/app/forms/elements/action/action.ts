import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NumberService } from 'src/app/core/services/number.service';
import { templateElementOptions } from 'src/app/core/constants/template-element-options';
import { ValidatorFn } from '@angular/forms';

export class Action extends ElementBase<Array<{}>> {
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

    constructor(options: ElementOptions<Array<{}>>) {
        super(options);
        this.isRequired = options.isRequired;
        this.label = options.label;
        this.type = ElementType.Action;
    }

    addValidators(formValidationService: FormValidationService, validators: Array<ValidatorFn>): void {
        formValidationService.addRequiredValidator(this.isRequired, validators);
    }

    static createInstance(key: string, numberService: NumberService, template: {}): Action {
        return new Action({
            isRequired: template[elementDesign.required] && template[elementDesign.mandatoryOperator] === templateElementOptions.always,
            isVisible: template[elementDesign.isShow],
            key: key,
            label: template[elementDesign.label],
            order: numberService.toNumber(template)
        });
    }
}