import * as _ from 'lodash';
import { Action } from 'src/app/forms/elements/action/action';
import { ActionBindValues } from '../enumerations/action-bind-values';
import { ActionProperty } from '../interfaces/action-property';
import { ActionService } from './action.service';
import { ArrayService } from './array.service';
import { Attachment } from 'src/app/forms/elements/attachment/attachment';
import { BusinessUnit } from 'src/app/forms/elements/business-unit/business-unit';
import { BusinessUnitService } from 'src/app/core/services/business-unit.service';
import { Checkbox } from 'src/app/forms/elements/checkbox/checkbox';
import { Currency } from 'src/app/forms/elements/currency/currency';
import { Date } from 'src/app/forms/elements/date/date';
import { Decimal } from 'src/app/forms/elements/decimal/decimal';
import { Divider } from 'src/app/forms/elements/divider/divider';
import { DropDown } from 'src/app/forms/elements/dropdown/dropdown';
import { ElementBase } from 'src/app/forms/elements/element-base';
import { ElementType } from '../enumerations/element-type';
import { FormAnswer } from '../interfaces/form-answer';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FormHeading } from 'src/app/forms/elements/form-heading/form-heading';
import { FormValidationService } from './form-validation.service';
import { Html } from 'src/app/forms/elements/html/html';
import { Image } from 'src/app/forms/elements/image/image';
import { Injectable } from '@angular/core';
import { Integer } from 'src/app/forms/elements/integer/integer';
import { Label } from 'src/app/forms/elements/label/label';
import { Signature } from 'src/app/forms/elements/signature/signature';
import { StringService } from './string.service';
import { Text } from 'src/app/forms/elements/text/text';
import { TextArea } from 'src/app/forms/elements/textarea/textarea';
import { TextValue } from '../interfaces/text-value';
import { Url } from 'src/app/forms/elements/url/url';

@Injectable({
    providedIn: 'root'
})
export class FormElementService {
    private readonly reportingTextSuffix = '_reportingText';

    constructor(
        private actionService: ActionService,
        private arrayService: ArrayService,
        private businessUnitService: BusinessUnitService,
        private formValidationService: FormValidationService,
        private stringService: StringService
    ) { }

    createAnswerData(answerData: {}, elements: Array<ElementBase<any>>, formGroup: FormGroup): void {

        elements.forEach(element => {
            if (this.arrayService.isNotNullAndNotUndefinedAndNotEmpty(element.children)) {
                this.createAnswerData(answerData, element.children, formGroup);
            }

            let formControlValue: any;
            let reportingValue: any;
            let value: any;

            switch (element.type) {

                case ElementType.Attachment:
                    this.addAnswerData(answerData, element, formGroup);
                    break;

                case ElementType.BusinessUnit:
                    formControlValue = formGroup.get(BusinessUnit.idKey).value;
                    reportingValue = formGroup.get(element.key).value;
                    value = this.businessUnitService.createBusinessUnitValue(formControlValue, reportingValue);
                    this.addAnswerData(answerData, element, formGroup, reportingValue, value);
                    break;

                case ElementType.CheckBox:
                    formControlValue = formGroup.get(element.key).value;
                    reportingValue = this.getListItemTexts((<DropDown>element).list, formControlValue);
                    value = this.createTrueValues(formControlValue);
                    this.addAnswerData(answerData, element, formGroup, reportingValue, value);
                    break;

                case ElementType.Currency:
                case ElementType.Date:
                case ElementType.DateTime:
                case ElementType.Decimal:
                case ElementType.Integer:
                case ElementType.Text:
                case ElementType.TextArea:
                case ElementType.Time:
                    this.addAnswerData(answerData, element, formGroup);
                    break;

                case ElementType.DropDown:
                case ElementType.RadioButton:
                    value = formGroup.get(element.key).value;
                    reportingValue = this.getListItemText((<DropDown>element).list, value);
                    this.addAnswerData(answerData, element, formGroup, reportingValue, value);
                    break;

                default:
                    break;
            }
        });
    }

    toActionFormsAnswer(): Array<Array<any>> {
        let actions: Array<FormGroup>

        if (this.actionService.actionKey) {
            actions = this.actionService.parentFormGroup.get(this.actionService.actionKey).value;
        }

        if (actions === null || actions == undefined) {
            return [];
        }

        let actionValues = new Array<Array<any>>();
        let answerData: {};

        actions.forEach(a => {
            let actionValue = new Array<any>();

            answerData = {};
            this.createAnswerData(answerData, this.actionService.actionElements, a);

            this.actionService.actionElements.forEach(e => {
                const key: string = this.stringService.replaceDashWithPeriod(e.key);

                const property: ActionProperty = {
                    answer: _.get(answerData, key),
                    bind: `${this.actionService.actionCalculatedKey}.elements.${key}`,
                    original: null
                }

                if (property.bind.endsWith(ActionBindValues.CompletedDate)) {
                    property.answer = null;
                }

                property.original = property.answer;
                actionValue.push(property);
            });

            actionValues.push(actionValue);
        })

        return actionValues;
    }

    getDefaultListItemValues(list: Array<TextValue>): Array<string> {
        let values = new Array<string>();

        list.forEach(i => {
            if (i.isDefault) {
                values.push(i.value);
            }
        });

        return values;
    }

    getStep<T extends Currency | Decimal | Integer>(element: T): string {
        if (element.type === ElementType.Decimal) {
            return '0.01';
        }

        return '1';
    }

    toFormAnswer(elements: Array<ElementBase<any>>, formGroup: FormGroup, templateID: number): FormAnswer {
        let answerData = {};
        this.createAnswerData(answerData, elements, formGroup);

        let answer: FormAnswer = {
            IsDraft: false,
            answerData: answerData,
            formDesignID: templateID
        };

        return answer;
    }

    toFormGroup(elements: Array<ElementBase<any>>): FormGroup {
        let group: any = {};
        this.createFormGroup(elements, group);
        return new FormGroup(group);
    }

    private createFormGroup(elements: Array<ElementBase<any>>, group: {}): void {
        elements.forEach(element => {
            if (this.arrayService.isNotNullAndNotUndefinedAndNotEmpty(element.children)) {
                this.createFormGroup(element.children, group);
            }

            if (element.isExpansionHeading) {
                return;
            }

            let control: FormControl;
            let validators = new Array<ValidatorFn>();

            switch (element.type) {

                case ElementType.Action:
                    control = this.createControl<Action>(element, validators);
                    break;

                case ElementType.Attachment:
                    control = this.createControl<Attachment>(element, validators);
                    break;

                case ElementType.BusinessUnit:
                    control = this.createControl<BusinessUnit>(element, validators);
                    group[BusinessUnit.idKey] = new FormControl();
                    break;

                case ElementType.CheckBox:
                    control = this.createControl<Checkbox>(element, validators, this.getDefaultListItemValues((<Checkbox>element).list));
                    break;

                case ElementType.Currency:
                    control = this.createControl<Currency>(element, validators);
                    break;

                case ElementType.Date:
                case ElementType.DateTime:
                case ElementType.Time:
                    control = this.createControl<Date>(element, validators, (<Date>element).value);
                    break;

                case ElementType.Decimal:
                    control = this.createControl<Decimal>(element, validators);
                    break;

                case ElementType.Divider:
                    control = this.createControl<Divider>(element, validators);
                    break;

                case ElementType.DropDown:
                case ElementType.RadioButton:
                    control = this.createControl<DropDown>(element, validators, (<DropDown>element).value);
                    break;

                case ElementType.FormHeading:
                    control = this.createControl<FormHeading>(element, validators);
                    break;

                case ElementType.Html:
                    control = this.createControl<Html>(element, validators);
                    break;

                case ElementType.Image:
                    control = this.createControl<Image>(element, validators);
                    break;

                case ElementType.Integer:
                    control = this.createControl<Integer>(element, validators);
                    break;

                case ElementType.Label:
                    control = this.createControl<Label>(element, validators);
                    break;

                case ElementType.Signature:
                    control = this.createControl<Signature>(element, validators);
                    break;

                case ElementType.Text:
                    control = this.createControl<Text>(element, validators, (<Text>element).value);
                    break;

                case ElementType.TextArea:
                    control = this.createControl<TextArea>(element, validators);
                    break;

                case ElementType.Url:
                    control = this.createControl<Url>(element, validators);
                    break;

                default:
                    break;
            }

            if (validators.length > 0) {
                control.setValidators(validators);
                control.updateValueAndValidity();
            }

            group[element.key] = control;
        });
    }

    private addAnswerData(answerData: {}, element: ElementBase<any>, formGroup: FormGroup, reportingValue: string = null, formValue: any = null): void {
        const key: string = this.stringService.replaceDashWithPeriod(element.key);
        formValue = formValue === null ? formGroup.get(element.key).value : formValue;
        reportingValue = reportingValue === null ? formValue : reportingValue;
        const bindValueProperties: Array<string> = key.split('.');

        if (bindValueProperties.length === 1) {
            answerData[key] = formValue;
            answerData[key + this.reportingTextSuffix] = reportingValue;
            return;
        }

        this.addAnswerDataValue(answerData, bindValueProperties, formValue);

        bindValueProperties[bindValueProperties.length - 1] += this.reportingTextSuffix;
        this.addAnswerDataValue(answerData, bindValueProperties, reportingValue);
    }

    private addAnswerDataValue(answerData: {}, bindValueProperties: Array<string>, value: any): void {
        let properties = '';

        bindValueProperties.forEach((v, i) => {
            if (i === 0) {
                return;
            }

            let propertyValue = `{"${v}": ".value."}`;

            if (i === bindValueProperties.length - 1) {
                propertyValue = typeof value === 'object' ?
                    propertyValue.replace('".value."', JSON.stringify(value)) :
                    propertyValue.replace('.value.', value);

                if (properties.includes('.value.')) {
                    properties = properties.replace('".value."', propertyValue);
                    return;
                }
            } else if (properties.includes('.value.')) {
                properties = properties.replace('".value."', propertyValue);
                return;
            }

            properties = propertyValue;
        });

        answerData[bindValueProperties[0]] = _.defaultsDeep(answerData[bindValueProperties[0]], JSON.parse(properties));
    }

    private createControl<T extends ElementBase<any>>(elementBase: ElementBase<any>, validators: Array<ValidatorFn>, value: any = null): FormControl {
        let element: T = <T><unknown>elementBase;
        element.addValidators(this.formValidationService, validators);
        return new FormControl(value);
    }

    private createTrueValues(values: Array<string>): {} {
        let value = {};

        values.forEach(v => {
            value[v] = true;
        })

        return value;
    }

    private getListItemText(list: Array<TextValue>, value: string): string {
        if (this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(value)) {
            return '';
        }

        return _.chain(list)
            .filter(l => l.value === value)
            .head()
            .value()
            .text;
    }

    private getListItemTexts(list: Array<TextValue>, values: Array<string>): string {
        if (values.length === 0) {
            return '';
        }

        return _.chain(list)
            .filter(l => values.includes(l.value))
            .map(l => {
                return l.text
            })
            .value()
            .join(', ');
    }
}