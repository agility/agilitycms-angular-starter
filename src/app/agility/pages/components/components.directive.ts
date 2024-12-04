import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[agilityComponent]',
  standalone: true
})
export class AgilityComponentsDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}