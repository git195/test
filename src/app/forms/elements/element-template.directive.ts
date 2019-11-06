import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-element-template]',
})
export class ElementTemplateDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}