import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NumberService } from 'src/app/core/services/number.service';
import { ValidatorFn } from '@angular/forms';

export class Image extends ElementBase<string> {
    private _description: string;
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }

    private _label: string;
    public get label(): string {
        return this._label;
    }
    public set label(value: string) {
        this._label = value;
    }

    private _text: string;
    public get text(): string {
        return this._text;
    }
    public set text(value: string) {
        this._text = value;
    }

    private _value: string;
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
    }

    constructor(options: ElementOptions<string>) {
        super(options);
        this.description = options.description;
        this.label = options.label;
        this.text = options.text;
        this.type = ElementType.Image;
        this.value = options.value;

    }

    addValidators(formValidationService: FormValidationService, validators: ValidatorFn[]): void {
        return;
    }
    
    static createInstance(key: string, numberService: NumberService, template: {}): Image {
        return new Image({
            description: template[elementDesign.description],
            isVisible: template[elementDesign.isShow],
            key: key,
            label: template[elementDesign.label],
            order: numberService.toNumber(template),
            text: template[elementDesign.alternateText],
            value: template[elementDesign.image]
        });
    }

}