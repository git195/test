import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementComponentBase } from '../element-component';
import { DropDown } from './dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, ElementComponentBase<DropDown> {
  @Input() formGroup: FormGroup;

  element: DropDown;

  constructor() { }

  ngOnInit() { }
}
