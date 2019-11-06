import { Checkbox } from './checkbox';
import { Component, Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormElementService } from 'src/app/core/services/form-element.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, ElementComponentBase<Checkbox> {
  @Input() formGroup: FormGroup;

  element: Checkbox;
  value: Array<string>;

  constructor(private formElementService: FormElementService) { }

  ngOnInit() {
    this.value = this.formElementService.getDefaultListItemValues(this.element.list);
  }
}
