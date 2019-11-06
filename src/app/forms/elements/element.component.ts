import { AbstractControl, FormGroup } from '@angular/forms';
import { Action } from './action/action';
import { ActionListComponent } from './action/action-list/action-list.component';
import { Attachment } from './attachment/attachment';
import { AttachmentComponent } from './attachment/attachment.component';
import { BusinessUnit } from './business-unit/business-unit';
import { BusinessUnitTextComponent } from './business-unit/business-unit-text/business-unit-text.component';
import { Checkbox } from './checkbox/checkbox';
import { CheckboxComponent } from './checkbox/checkbox.component';
import {
    Component,
    ComponentFactoryResolver,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Currency } from './currency/currency';
import { CurrencyComponent } from './currency/currency.component';
import { Date } from './date/date';
import { DateComponent } from './date/date.component';
import { Decimal } from './decimal/decimal';
import { DecimalComponent } from './decimal/decimal.component';
import { Divider } from './divider/divider';
import { DividerComponent } from './divider/divider.component';
import { DropDown } from './dropdown/dropdown';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ElementComponentBase } from './element-component';
import { elementControl } from 'src/app/core/constants/element-control';
import { ElementTemplateDirective } from './element-template.directive';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { FormHeading } from './form-heading/form-heading';
import { FormHeadingComponent } from './form-heading/form-heading.component';
import { Html } from './html/html';
import { HtmlComponent } from './html/html.component';
import { Image } from './image/image';
import { ImageComponent } from './image/image.component';
import { Integer } from './integer/integer';
import { IntegerComponent } from './integer/integer.component';
import { Label } from './label/label';
import { LabelComponent } from './label/label.component';
import { PopoverService } from 'src/app/core/services/popover.service';
import { Signature } from './signature/signature';
import { SignatureComponent } from './signature/signature.component';
import { StringService } from 'src/app/core/services/string.service';
import { Text } from './text/text';
import { TextArea } from './textarea/textarea';
import { TextareaComponent } from './textarea/textarea.component';
import { TextComponent } from './text/text.component';
import { Url } from './url/url';
import { UrlComponent } from './url/url.component';

@Component({
    selector: 'app-element',
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.scss'],
})

export class ElementComponent implements OnInit {
    @Input() element: any;
    @Input() formGroup: FormGroup;
    @Input() isSubmitted: boolean;

    @ViewChild(ElementTemplateDirective) elementTemplate: ElementTemplateDirective;

    get showInvalid(): boolean {
        if (
            this.control &&
            this.control.errors &&
            this.control.errors.required &&
            this.componentRefInstance.value !== undefined &&
            !this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(this.componentRefInstance.value) &&
            this.componentRefInstance.value.length > 1
        ) {
            return true;
        }

        if (
            this.control &&
            this.control.value === null &&
            this.componentRefInstance.value !== undefined &&
            !this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(this.componentRefInstance.value) &&
            this.componentRefInstance.value.length > 1
        ) {
            return true;
        }

        return false;
    }

    get showMaximumValueRequired(): boolean {
        return this.control && this.control.errors && this.control.errors.max;
    }

    get showMinimumLengthRequired(): boolean {
        return this.control && this.control.errors && this.control.errors.minlength;
    }

    get showMinimumValueRequired(): boolean {
        return this.control && this.control.errors && this.control.errors.min;
    }

    get showRequired(): boolean {
        if (
            this.control &&
            this.control.errors &&
            this.control.errors.required &&
            this.componentRefInstance.value !== undefined &&
            !this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(this.componentRefInstance.value) &&
            this.componentRefInstance.value.length > 1
        ) {
            return false;
        }

        return this.control && this.control.errors && this.control.errors.required && this.isSubmitted;
    }

    description: string;
    isFormHeading: boolean;
    isRequired: boolean;

    private componentRefInstance: any;
    private control: AbstractControl;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private popoverService: PopoverService,
        private stringService: StringService
    ) { }

    ngOnInit() {
        this.control = this.formGroup.get(this.element.key);
        this.loadElement();
    }

    loadElement() {
        switch (this.element.type) {

            case ElementType.Action:
                this.createComponent<Action>(ActionListComponent);
                break;

            case ElementType.Attachment:
                this.createComponent<Attachment>(AttachmentComponent);
                break;

            case ElementType.BusinessUnit:
                this.createComponent<BusinessUnit>(BusinessUnitTextComponent);
                break;

            case ElementType.CheckBox:
                this.createComponent<Checkbox>(CheckboxComponent);
                break;

            case ElementType.Currency:
                this.createComponent<Currency>(CurrencyComponent);
                break;

            case ElementType.Date:
            case ElementType.DateTime:
            case ElementType.Time:
                this.createComponent<Date>(DateComponent);
                break;

            case ElementType.Decimal:
                this.createComponent<Decimal>(DecimalComponent);
                break;

            case ElementType.Divider:
                this.createComponent<Divider>(DividerComponent);
                break;

            case ElementType.DropDown:
            case ElementType.RadioButton:
                this.createComponent<DropDown>(DropdownComponent);
                break;

            case ElementType.FormHeading:
                this.createComponent<FormHeading>(FormHeadingComponent);
                this.isFormHeading = true;
                break;

            case ElementType.Html:
                this.createComponent<Html>(HtmlComponent);
                break;

            case ElementType.Image:
                this.createComponent<Image>(ImageComponent);
                break;

            case ElementType.Integer:
                this.createComponent<Integer>(IntegerComponent);
                break;

            case ElementType.Label:
                this.createComponent<Label>(LabelComponent);
                break;

            case ElementType.Signature:
                this.createComponent<Signature>(SignatureComponent);
                break;

            case ElementType.Text:
                this.createComponent<Text>(TextComponent);
                break;

            case ElementType.TextArea:
                this.createComponent<TextArea>(TextareaComponent);
                break;

            case ElementType.Url:
                this.createComponent<Url>(UrlComponent);
                break;

            default:
                return;
        }
    }

    async showDescription(event: Event): Promise<void> {
        await this.popoverService.presentPopover(this.description, event);
    }

    private createComponent<T>(component: any): void {
        const element = <T>this.element;
        this.createComponentRef<T>(component, element);

        if (element[elementControl.description]) {
            this.description = element[elementControl.description];
        }

        if (element[elementControl.isRequired]) {
            this.isRequired = element[elementControl.isRequired];
        }
    }

    private createComponentRef<T>(component: any, element: T): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const viewContainerRef = this.elementTemplate.viewContainerRef;
        viewContainerRef.clear();

        const componentRef = viewContainerRef.createComponent(componentFactory);
        const componentRefInstance = <ElementComponentBase<T>>componentRef.instance;
        componentRefInstance.element = element;
        componentRefInstance.formGroup = this.formGroup;
        this.componentRefInstance = componentRefInstance;
    }
}