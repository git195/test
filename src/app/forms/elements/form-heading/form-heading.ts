import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ValidatorFn } from '@angular/forms';
import { NumberService } from 'src/app/core/services/number.service';

export class FormHeading extends ElementBase<string> {
    private _text : string;
    public get text() : string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
    }

    constructor(options: ElementOptions<string>) {
        super(options);
        this.text = options.text;
        this.type = ElementType.FormHeading;
    }

    addValidators(formValidationService: FormValidationService, validators: ValidatorFn[]): void {
        return;
    }

    static createInstance(key: string, numberService: NumberService, template: {}): FormHeading {
        return new FormHeading({
            isVisible: template[elementDesign.isShow],
            key: key,
            order: numberService.toNumber(template),
            text: template[elementDesign.label],
        });
    }
}