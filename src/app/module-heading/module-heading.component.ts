import { Component, OnInit, Input } from '@angular/core';
import { IAgilityModuleComponent } from '../../agility/agility.module.icomponent';

@Component({
  selector: 'app-module-heading',
  templateUrl: './module-heading.component.html',
})
export class ModuleHeading implements IAgilityModuleComponent {
  @Input() data: any;

  public item: any = null;

  constructor() {}

  ngOnInit(): void {
    this.item = this.data.item.fields;
  }
}
