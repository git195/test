import { ElementOptions } from 'src/app/core/interfaces/element-options';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { ValidatorFn } from '@angular/forms';

export abstract class ElementBase<T> {
    private _children : Array<ElementBase<T>>;
    public get children() : Array<ElementBase<T>> {
        return this._children;
    }
    public set children(value : Array<ElementBase<T>>) {
        this._children = value;
    }
    
    private _key : string;
    public get key() : string {
        return this._key;
    }
    public set key(value: string) {
        this._key = value;
    }

    public get isExpansionHeading() : boolean {
        return this.type === ElementType.SectionHeading || this.type === ElementType.GroupHeading;
    }
    
    private _isVisible : boolean;
    public get isVisible() : boolean {
        return this._isVisible;
    }
    public set isVisible(value: boolean) {
        this._isVisible = value;
    }
    
    private _order : number;
    public get order() : number {
        return this._order;
    }
    public set order(value: number) {
        this._order = value;
    }
    
    private _type : ElementType;
    public get type() : ElementType {
        return this._type;
    }
    public set type(value: ElementType) {
        this._type = value;
    }

    constructor(options: ElementOptions<T>) {
        this.key = options.key;
        this.isVisible = options.isVisible;
        this.order = options.order;
    }

    abstract addValidators(formValidationService: FormValidationService, validators: Array<ValidatorFn>): void;
}