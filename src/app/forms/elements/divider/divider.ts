import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ValidatorFn } from '@angular/forms';
import { NumberService } from 'src/app/core/services/number.service';

export class Divider extends ElementBase<string> {
    constructor(options: ElementOptions<string>) {
        super(options);
        this.type = ElementType.Divider;
    }

    addValidators(formValidationService: FormValidationService, validators: ValidatorFn[]): void {
        return;
    }

    static createInstance(key: string, numberService: NumberService, template: {}): Divider {
        return new Divider({
            isVisible: template[elementDesign.isShow],
            key: key,
            order: numberService.toNumber(template)
        });
    }
}