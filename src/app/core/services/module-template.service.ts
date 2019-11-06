import * as _ from 'lodash';
import { Action } from 'src/app/forms/elements/action/action';
import { ActionService } from './action.service';
import { Attachment } from 'src/app/forms/elements/attachment/attachment';
import { BusinessUnit } from 'src/app/forms/elements/business-unit/business-unit';
import { Checkbox } from 'src/app/forms/elements/checkbox/checkbox';
import { Currency } from 'src/app/forms/elements/currency/currency';
import { Date } from 'src/app/forms/elements/date/date';
import { Decimal } from 'src/app/forms/elements/decimal/decimal';
import { Divider } from 'src/app/forms/elements/divider/divider';
import { DropDown } from 'src/app/forms/elements/dropdown/dropdown';
import { ElementBase } from 'src/app/forms/elements/element-base';
import { elementDesign } from '../constants/element-design';
import { elementDesignTypes } from '../constants/element-design-types';
import { ElementType } from '../enumerations/element-type';
import { FormHeading } from 'src/app/forms/elements/form-heading/form-heading';
import { FormValidationService } from './form-validation.service';
import { Html } from 'src/app/forms/elements/html/html';
import { Image } from 'src/app/forms/elements/image/image';
import { Injectable } from '@angular/core';
import { Integer } from 'src/app/forms/elements/integer/integer';
import { Label } from 'src/app/forms/elements/label/label';
import { NumberService } from './number.service';
import { SectionHeading } from 'src/app/forms/elements/section-heading/section-heading';
import { Signature } from 'src/app/forms/elements/signature/signature';
import { StringService } from './string.service';
import { Text } from 'src/app/forms/elements/text/text';
import { TextArea } from 'src/app/forms/elements/textarea/textarea';
import { Url } from 'src/app/forms/elements/url/url';

@Injectable({
    providedIn: 'root'
})
export class ModuleTemplateService {
    constructor(
        private actionService: ActionService,
        private formValidationService: FormValidationService,
        private numberService: NumberService,
        private stringService: StringService
    ) { }

    toElements(templateDesign: Array<any>): Array<ElementBase<any>> {
        let elements: Array<ElementBase<any>> = new Array();

        templateDesign = _.orderBy(templateDesign, ['row', 'col'], ['asc', 'asc']);

        templateDesign.forEach(template => {
            let key: string = this.stringService.replacePeriodWithDash(template[elementDesign.bind]);

            const showElement = template[elementDesign.type] === elementDesignTypes.divider ||
                template[elementDesign.type] === elementDesignTypes.formHeading ||
                template[elementDesign.type] === elementDesignTypes.groupHeading ||
                template[elementDesign.type] === elementDesignTypes.html ||
                template[elementDesign.type] === elementDesignTypes.image ||
                template[elementDesign.type] === elementDesignTypes.label ||
                template[elementDesign.type] === elementDesignTypes.sectionHeading ||
                template[elementDesign.type] === elementDesignTypes.signature ||
                template[elementDesign.type] === elementDesignTypes.url;

            if (key !== null || showElement) {
                let element: any = null;

                switch (template[elementDesign.type]) {

                    case elementDesignTypes.action:
                        if (_.filter(elements, e => e.type === ElementType.Action).length > 0) {
                            break;
                        }

                        element = Action.createInstance(key, this.numberService, template);
                        this.actionService.actionElement = element;
                        this.actionService.actionKey = key;
                        break;

                    case elementDesignTypes.attachment:
                        element = Attachment.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.businessUnit:
                        element = BusinessUnit.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.checkBox:
                        element = Checkbox.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.currency:
                        element = Currency.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.date:
                    case elementDesignTypes.dateTime:
                    case elementDesignTypes.time:
                        element = Date.createInstance(this.formValidationService, key, this.numberService, template);
                        break;

                    case elementDesignTypes.decimal:
                        element = Decimal.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.divider:
                        key = this.getKey('divider', template);
                        element = Divider.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.dropDown:
                    case elementDesignTypes.radioButton:
                        element = DropDown.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.formHeading:
                        key = this.getKey('formHeading', template);
                        element = FormHeading.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.html:
                        key = this.getKey('html', template);
                        element = Html.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.image:
                        key = this.getKey('src', template);
                        element = Image.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.integer:
                        element = Integer.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.label:
                        key = this.getKey('label', template);
                        element = Label.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.groupHeading:
                    case elementDesignTypes.sectionHeading:
                        const isGroupHeading = template[elementDesign.type] === elementDesignTypes.groupHeading;
                        const keyPrefix = isGroupHeading ? 'groupHeading' : 'sectionHeading';
                        key = this.getKey(keyPrefix, template);
                        const headingElement: SectionHeading = SectionHeading.createInstance(key, this.numberService, template);

                        const headingTemplateDesign: Array<any> = this.getHeadingChildrenElements(
                            template[elementDesign.col],
                            !isGroupHeading,
                            template[elementDesign.referenceIndex],
                            template[elementDesign.row],
                            templateDesign
                        );

                        headingTemplateDesign.forEach(e1 => {
                            const elementIndex: number = templateDesign.findIndex(e2 => e2.referenceIndex === e1.referenceIndex);
                            templateDesign.splice(elementIndex, 1);
                        });

                        headingElement.children = this.toElements(headingTemplateDesign);
                        element = headingElement;
                        break;

                    case elementDesignTypes.signature:
                        key = this.getKey('SignatureUser', template);
                        element = Signature.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.text:
                        element = Text.createInstance(this.formValidationService, key, this.numberService, template);
                        break;

                    case elementDesignTypes.textArea:
                        element = TextArea.createInstance(key, this.numberService, template);
                        break;

                    case elementDesignTypes.url:
                        key = this.getKey('url', template);
                        element = Url.createInstance(key, this.numberService, template);
                        break;

                    default:
                        break;
                }

                if (element !== null) {
                    elements.push(element);
                }
            }
        });

        return elements;
    }

    typeExists(templateDesign: Array<any>, type: string): boolean {
        const typeElements = _.chain(templateDesign)
            .filter(e => e.type === type)
            .size()
            .value();

        return typeElements > 0;
    }

    private getKey(element: string, template: any): string {
        return `${element}${template[elementDesign.row]}${template[elementDesign.col]}`;
    }

    private getHeadingChildrenElements(column: number, isSectionHeading: boolean, referenceIndex: number, row: number, templateDesign: Array<any>): Array<any> {
        const headingIndex: number = templateDesign.findIndex(e => e.referenceIndex === referenceIndex);

        let nextHeadings: Array<any> = _.chain(templateDesign)
            .filter(t =>
                (t.type === elementDesignTypes.sectionHeading || t.type === elementDesignTypes.groupHeading) &&
                ((t.row > row) || (t.row == row && t.col > column))
            ).value();

        if (isSectionHeading) {
            nextHeadings = _.filter(nextHeadings, t => t.type === elementDesignTypes.sectionHeading)
        }

        const nextHeading = _.head(nextHeadings);

        if (nextHeading === undefined) {
            return templateDesign.slice(headingIndex + 1);
        }

        const nextHeadingIndex: number = templateDesign.findIndex(e => e.referenceIndex === nextHeading.referenceIndex);
        return templateDesign.slice(headingIndex + 1, nextHeadingIndex);
    }
}