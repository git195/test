import { Component, OnInit, Input } from '@angular/core';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { Image } from './image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, ElementComponentBase<Image> {
  @Input() formGroup: FormGroup;

  element: Image;

  constructor() { }

  ngOnInit() { }
}
