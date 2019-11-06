import { Component, OnInit, Input } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { Decimal } from './decimal';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { FormElementService } from 'src/app/core/services/form-element.service';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { StringService } from 'src/app/core/services/string.service';

function validateInvalid(inputValue: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    let value: string = control.value.toString();
    
    if (inputValue === '.' && value.includes('.')) {
      return {'invalid': true};
    }
    
    return null;
  }
}

@Component({
  selector: 'app-decimal',
  templateUrl: './decimal.component.html',
  styleUrls: ['./decimal.component.scss'],
})
export class DecimalComponent implements OnInit, ElementComponentBase<Decimal> {
  @Input() formGroup: FormGroup;

  element: Decimal;
  maximumValue: number;
  minimumValue: number;
  step: string;
  value: string;
  
  constructor(
    private formElementService: FormElementService,
    private formValidationService: FormValidationService,
    private stringService: StringService
  ) { }

  ngOnInit() {
    this.maximumValue = this.formValidationService.getMaximumValue(this.element.validation);
    this.minimumValue = this.formValidationService.getMinimumValue(this.element.validation);
    this.step = this.formElementService.getStep(this.element);
  }

  validateDecimal($event: CustomEvent): void {
    const targetValue: number = $event.detail.target.value;    

    if (
      this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(targetValue.toString()) &&
      !this.stringService.isNullOrUndefinedOrEmptyOrWhitespace(this.value)
    ) {
      this.value = this.value;
    } else {
      this.value = targetValue.toString();
    }
  }
}
