import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-richtextarea',
  templateUrl: './richtextarea.component.html',
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
