import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-heading',
  templateUrl: './heading.component.html',
  standalone: true,
})
export class ModuleHeading implements OnInit {
  @Input() data: any;
  public item: any = null;

  constructor() {}

  ngOnInit(): void {
    this.item = this.data.item.fields;
  }
}
