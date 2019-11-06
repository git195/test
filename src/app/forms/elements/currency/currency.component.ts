import { Component, Input, OnInit } from '@angular/core';
import { Currency } from './currency';
import { ElementComponentBase } from '../element-component';
import { FormElementService } from 'src/app/core/services/form-element.service';
import { FormGroup } from '@angular/forms';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { StringService } from 'src/app/core/services/string.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit, ElementComponentBase<Currency> {
  @Input() formGroup: FormGroup;

  element: Currency;
  step: string;
  value: string;

  constructor(
    private formElementService: FormElementService,
    private formValidationService: FormValidationService,
    private stringService: StringService
  ) { }

  ngOnInit() {
    this.step = this.formElementService.getStep(this.element);
    this.value = null;
  }

  validateCurrency($event: CustomEvent): void {
    const data: string = $event.detail.data;
    const targetValue: number = $event.detail.target.value;

    if (
      this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(targetValue.toString()) &&
      !this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(this.value)
    ) {
      this.value = this.value;
    } else {
      this.value = targetValue.toString();
    }

    if (data === '.' && targetValue !== null && (data === '.' && targetValue.toString().includes('.'))) {
      return;
    }

    const currency: string = this.formValidationService.getValidCurrency(targetValue.toString());
    this.formGroup.get(this.element.key).setValue(<number><unknown>currency);
  }
}
