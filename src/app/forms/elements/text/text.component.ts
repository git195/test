import { Component, Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { Text } from './text';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
})
export class TextComponent implements OnInit, ElementComponentBase<Text> {
  @Input() formGroup: FormGroup;

  element: Text;
  maximumLength: number;

  constructor(private formValidationService: FormValidationService) { }

  ngOnInit() {
    this.maximumLength = this.formValidationService.getMaximumLength(this.element.validation);
  }
}