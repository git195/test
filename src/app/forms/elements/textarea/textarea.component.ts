import { Component, Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { TextArea } from './textarea';
import { FormValidationService } from 'src/app/core/services/form-validation.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent implements OnInit, ElementComponentBase<TextArea> {
  @Input() formGroup: FormGroup;

  element: TextArea;
  maximumLength: number;

  constructor(private formValidationService: FormValidationService) { }

  ngOnInit() {
    this.maximumLength = this.formValidationService.getMaximumLength(this.element.validation);
  }

}
