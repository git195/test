import { ElementBase } from '../element-base';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementOptionValidation } from 'src/app/core/interfaces/element-option-validation';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { elementDesign } from 'src/app/core/constants/element-design';
import { templateElementOptions } from 'src/app/core/constants/template-element-options';
import { ValidatorFn, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NumberService } from 'src/app/core/services/number.service';

export class Attachment extends ElementBase<string> {

    private _label: string;
    public get label(): string {
        return this._label;
    }
    public set label(value: string) {
        this._label = value;
    }

    private _isRequired : boolean;
    public get isRequired() : boolean {
        return this._isRequired;
    }
    public set isRequired(value: boolean) {
        this._isRequired = value;
    }
    
    private _noIcon : string;
    public get noIcon() : string {
        return this._noIcon;
    }
    public set noIcon(value: string) {
        this._noIcon = value;
    }

    private _attachmentBind : string;
    public get attachmentBind() : string {
        return this._attachmentBind;
    }
    public set attachmentBind(value: string) {
        this._attachmentBind = value;
    }

    private _validation : ElementOptionValidation;
    public get validation() : ElementOptionValidation {
        return this._validation;
    }
    public set validation(value: ElementOptionValidation) {
        this._validation = value;
    }
    
    constructor(options: ElementOptions<string>) {
        super(options);
        this._label = options.label;
        this.isRequired = options.isRequired;
        this.noIcon = options.noIcon;
        this.attachmentBind = options.attachmentBind;
        this.type = ElementType.Attachment;
    }

    addValidators(formValidationService: FormValidationService, validators: Array<ValidatorFn>): void {
        formValidationService.addRequiredValidator(this.isRequired, validators);
    }

    static createInstance(key: string, numberService: NumberService, template: {}): Attachment {
        let attachment = new Attachment({
            attachmentBind: template[elementDesign.attachmentBind],
            isRequired: template[elementDesign.required] && template[elementDesign.mandatoryOperator] === templateElementOptions.always,
            isVisible: template[elementDesign.isShow],
            key: key,
            label: template[elementDesign.label],
            noIcon: template[elementDesign.noIcon],
            order: numberService.toNumber(template)
        });
        return attachment;
    }
}