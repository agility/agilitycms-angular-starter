import { Component, OnInit, Input } from '@angular/core';
import { IAgilityModuleComponent } from '../../../../services/agility.module.icomponent';

@Component({
  selector: 'app-module-textblockwithimage',
  templateUrl: './textblockwithimage.component.html',
})
export class ModuleTextBlockWithImage implements IAgilityModuleComponent {
  @Input() data: any;

  public item: any = null;

  constructor() {}

  ngOnInit(): void {
    this.item = this.data.item.fields;
  }
}
