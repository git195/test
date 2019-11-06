import { ArrayService } from 'src/app/core/services/array.service';
import { Component, Input, OnInit } from '@angular/core';
import { ElementBase } from '../element-base';
import { ElementComponentBase } from '../element-component';
import { FormGroup } from '@angular/forms';
import { SectionHeading } from './section-heading';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.component.html',
  styleUrls: ['./section-heading.component.scss'],
})
export class SectionHeadingComponent implements OnInit, ElementComponentBase<SectionHeading> {
  @Input() element: SectionHeading;
  @Input() formGroup: FormGroup;
  @Input() isSubmitted: boolean;

  constructor(private arrayService: ArrayService) { }

  ngOnInit() { }

  hasChildren(element: ElementBase<any>): boolean {
    return this.arrayService.isNotNullAndNotUndefinedAndNotEmpty(element.children);
  }
}
