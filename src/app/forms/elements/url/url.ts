import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ValidatorFn } from '@angular/forms';
import { NumberService } from 'src/app/core/services/number.service';

export class Url extends ElementBase<string> {
    private _description : string;
    public get description() : string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    private _text : string;
    public get text() : string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
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
        this.text = options.text;
        this.type = ElementType.Url;
        this.value = options.value;
    }

    addValidators(formValidationService: FormValidationService, validators: ValidatorFn[]): void {
        return;
    }

    static createInstance(key: string, numberService: NumberService, template: {}): Url {
        return new Url({
            description: template[elementDesign.description],
            isVisible: template[elementDesign.isShow],
            key: key,
            order: numberService.toNumber(template),
            text: template[elementDesign.title],
            value: template[elementDesign.url]
        });
    }
}