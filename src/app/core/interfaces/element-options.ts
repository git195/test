import { ElementOptionValidation } from './element-option-validation';
import { SignatureType } from 'src/app/core/enumerations/signature-type';
import { SignatureUser } from './signature-user';
import { TextValue } from './text-value';

export interface ElementOptions<T> {
    attachmentBind?: string,
    description?: string;
    html?: string;
    isRequired?: boolean;
    isVisible: boolean;
    key: string;
    label?: string;
    list?: Array<TextValue>;
    noIcon?:string;
    order: number;
    placeholder?: string;
    signature?: string;
    signatureType?: SignatureType;
    signatureUser?: SignatureUser;
    text?: string;
    validation?: ElementOptionValidation;
    value?: T;
}
