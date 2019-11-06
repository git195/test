import { Component, Input, OnInit } from '@angular/core';
import { Divider } from './divider';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class DividerComponent implements OnInit, ElementComponentBase<Divider> {
  @Input() formGroup: FormGroup;

  element: Divider;

  constructor() { }

  ngOnInit() { }
}
