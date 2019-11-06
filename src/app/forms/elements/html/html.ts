import { ElementBase } from '../element-base';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { elementDesign } from 'src/app/core/constants/element-design';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NumberService } from 'src/app/core/services/number.service';
import { templateElementOptions } from 'src/app/core/constants/template-element-options';
import { ValidatorFn } from '@angular/forms';

export class Html extends ElementBase<string> {
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

    
    constructor(options: ElementOptions<string>) {
        super(options);
        this.description = options.description;
        this.text = options.text;
        this.type = ElementType.Html;
    }

    addValidators(formValidationService: FormValidationService, validators: ValidatorFn[]): void {
        return;
    }

    static createInstance(key: string, numberService: NumberService, template: {}): Html {

        let html = new Html({
            description: template[elementDesign.description],
            isRequired: template[elementDesign.required] && template[elementDesign.mandatoryOperator] === templateElementOptions.always,
            isVisible: template[elementDesign.isShow],
            key: key,
            order: numberService.toNumber(template),
            text: template[elementDesign.html]
            
        });
        return html;
    }
}