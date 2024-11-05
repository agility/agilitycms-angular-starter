import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-richtextarea',
  template: `
    <div class="relative px-8">
      <div class="max-w-2xl mx-auto my-12 md:mt-18 lg:mt-20">
        <div
          class="prose max-w-full mx-auto"
          [innerHTML]="textblob"
        ></div>
      </div>
    </div>
  `,
  styles: [],
  standalone: true,
})
export class ModuleRichTextAreaComponent implements OnInit {
  @Input() item: any;
  textblob: string = '';

  ngOnInit(): void {
    this.withFetch();
  }

  withFetch() {
    this.textblob = this.item.fields.textblob;
  }
}
