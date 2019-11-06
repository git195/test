import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ValidatorFn } from '@angular/forms';
import { NumberService } from 'src/app/core/services/number.service';

export class Label extends ElementBase<string> {
    private _label : string;
    public get label() : string {
        return this._label;
    }
    public set label(value: string) {
        this._label = value;
    }

    constructor(options: ElementOptions<string>) {
        super(options);
        this.label = options.label;
        this.type = ElementType.Label;
    }

    addValidators(formValidationService: FormValidationService, validators: ValidatorFn[]): void {
        return;
    }

    static createInstance(key: string, numberService: NumberService, template: {}): Label {
        return new Label({
            isVisible: template[elementDesign.isShow],
            key: key,
            label: template[elementDesign.description],
            order: numberService.toNumber(template)
        });
    }
}