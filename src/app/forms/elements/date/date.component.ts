import { Component, Input, OnInit } from '@angular/core';
import { Date } from './date';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { ElementType } from 'src/app/core/enumerations/element-type';
import { StringService } from 'src/app/core/services/string.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit, ElementComponentBase<Date> {
  @Input() formGroup: FormGroup;

  displayFormat: string;
  element: Date;

  constructor() { }

  ngOnInit() {
    switch (this.element.type) {
      case ElementType.Date:
        this.displayFormat = 'DD/MMM/YYYY';
        break;

      case ElementType.DateTime:
        this.displayFormat = 'DD/MMM/YYYY hh:mm A';
        break;

      case ElementType.Time:
        this.displayFormat = 'hh:mm A';
        break;

      default:
        break;
    }

    if (this.element.type === ElementType.Time) {
      this.element.placeholder = 'Select a time';
    }
  }
}
