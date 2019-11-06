import { Component, OnInit, Input } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { Url } from './url';

@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss'],
})
export class UrlComponent implements OnInit, ElementComponentBase<Url> {
  @Input() formGroup: FormGroup;

  element: Url;

  constructor() { }

  ngOnInit() { }
}
