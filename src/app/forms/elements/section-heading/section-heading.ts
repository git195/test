import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ValidatorFn } from '@angular/forms';
import { NumberService } from 'src/app/core/services/number.service';
import { elementDesignTypes } from 'src/app/core/constants/element-design-types';

export class SectionHeading extends ElementBase<string> {
    private _text : string;
    public get text() : string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
    }

    constructor(options: ElementOptions<string>, elementType: ElementType) {
        super(options);
        this.text = options.text;
        this.type = elementType;
    }

    addValidators(formValidationService: FormValidationService, validators: ValidatorFn[]): void {
        return;
    }

    static createInstance(key: string, numberService: NumberService, template: {}): SectionHeading {
        const isSectionHeading = template[elementDesign.type] === elementDesignTypes.sectionHeading;

        return new SectionHeading({
            isVisible: template[elementDesign.isShow],
            key: key,
            order: numberService.toNumber(template),
            text: template[elementDesign.title],
        },
        isSectionHeading ? ElementType.SectionHeading : ElementType.GroupHeading);
    }
}