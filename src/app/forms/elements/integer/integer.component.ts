import { Component, Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { Integer } from './integer';
import { FormElementService } from 'src/app/core/services/form-element.service';
import { StringService } from 'src/app/core/services/string.service';

@Component({
  selector: 'app-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss'],
})
export class IntegerComponent implements OnInit, ElementComponentBase<Integer> {
  @Input() formGroup: FormGroup;

  element: Integer;
  maximumValue: number;
  minimumValue: number;
  step: string;
  value: string;

  constructor(
    private formElementService: FormElementService,
    private formValidationService: FormValidationService,
    private stringService: StringService
  ) { }

  ngOnInit(): void {
    this.maximumValue = this.formValidationService.getMaximumValue(this.element.validation);
    this.minimumValue = this.formValidationService.getMinimumValue(this.element.validation);
    this.step = this.formElementService.getStep(this.element);
  }

  validateInteger($event: CustomEvent): void {
    const data: string = $event.detail.data;
    const targetValue: number = $event.detail.target.value;

    if (
      this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(targetValue.toString()) &&
      !this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(this.value)
    ) {
      this.value = this.value;
    } else if (this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(targetValue.toString())) {
      this.value = targetValue.toString();
    }

    if (data === '.' && targetValue !== null && (data === '.' && targetValue.toString().includes('.'))) {
      return;
    }

    const integer: string = this.formValidationService.getValidInteger(targetValue.toString());
    this.formGroup.get(this.element.key).setValue(<number><unknown>integer);
  }
}
