import { ElementBase } from '../element-base';
import { elementDesign } from 'src/app/core/constants/element-design';
import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { NumberService } from 'src/app/core/services/number.service';
import { SignatureType } from 'src/app/core/enumerations/signature-type';
import { SignatureUser } from 'src/app/core/interfaces/signature-user';
import { ValidatorFn } from '@angular/forms';

export class Signature extends ElementBase<string> {

    private _description: string;
    public get description() {
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

    private _signatureType: SignatureType;
    public get signatureType() {
        return this._signatureType;
    }
    public set signatureType(value: SignatureType) {
        this._signatureType = value;
    }

    private _signatureUser: SignatureUser;
    public get signatureUser(): SignatureUser {
        return this._signatureUser;
    }
    public set signatureUser(value: SignatureUser) {
        this._signatureUser = value;
    }

    constructor(options: ElementOptions<string>) {
        super(options);

        this._description = options.description;
        this._label = options.label;
        this.signatureType = options.signatureType;
        this.signatureUser = options.signatureUser;
        this.type = ElementType.Signature;
    }

    addValidators(formValidationService: FormValidationService, validators: ValidatorFn[]): void {
        return;
    }

    static createInstance(key: string, numberService: NumberService, template: {}): Signature {
        return new Signature({
            description: template[elementDesign.description],
            isVisible: template[elementDesign.isShow],
            key: key,
            label: template[elementDesign.label],
            order: numberService.toNumber(template),
            signatureType: template[elementDesign.signatureType],
            signatureUser: template[elementDesign.signatureUser]
        });
    }
}
