import { Component, Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { Label } from './label';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit, ElementComponentBase<Label> {
  @Input() formGroup: FormGroup;

  element: Label;
  
  constructor() { }

  ngOnInit() { }
}
