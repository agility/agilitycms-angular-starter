import { Component, OnInit, Input } from '@angular/core';
import { IAgilityModuleComponent } from '../../../../services/agility.module.icomponent';

@Component({
  selector: 'app-module-richtextarea',
  template: `
    <div class="relative px-8">
      <div class="max-w-2xl mx-auto my-12 md:mt-18 lg:mt-20">
        <div
          class="prose max-w-full mx-auto"
          v-html="item.fields.textblob"
          [innerHTML]="textblob"
        ></div>
      </div>
    </div>
  `,
  styles: [],
})
export class ModuleRichTextAreaComponent implements IAgilityModuleComponent {
  @Input() data: any;

  public textblob: string = '';

  constructor() {}

  ngOnInit(): void {
    this.textblob = this.data.item.fields.textblob;
  }
}
