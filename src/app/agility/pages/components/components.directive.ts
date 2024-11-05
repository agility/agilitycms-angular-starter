import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[agilityComponent]',
  standalone: true
})
export class AgilityComponentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}