import { Component,Input, OnInit } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { Html } from './html';

@Component({
  selector: 'app-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.scss'],
})
export class HtmlComponent implements OnInit,ElementComponentBase<Html> {
  @Input() formGroup: FormGroup;

  element: Html;
  
  constructor() { }

  ngOnInit() {}

}
