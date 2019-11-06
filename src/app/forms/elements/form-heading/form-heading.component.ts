import { Component, Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { FormHeading } from './form-heading';

@Component({
  selector: 'app-form-heading',
  templateUrl: './form-heading.component.html',
  styleUrls: ['./form-heading.component.scss'],
})
export class FormHeadingComponent implements OnInit, ElementComponentBase<FormHeading> {
  @Input() formGroup: FormGroup;

  element: FormHeading;

  constructor() { }

  ngOnInit() { }
}
