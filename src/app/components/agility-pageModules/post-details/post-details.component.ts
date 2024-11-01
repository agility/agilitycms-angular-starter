import { Component, Input, OnInit } from '@angular/core';
import { IAgilityModuleComponent } from '../../../services/agility.module.icomponent';

@Component({
  selector: 'app-module-post-details',
  templateUrl: './post-details.component.html',
})
export class ModulePostDetailsComponent implements IAgilityModuleComponent {
  @Input() data: any;

  public post: any = null;

  constructor() {}

  ngOnInit(): void {
    this.post = this.data.dynamicPageItem.fields;

    this.post.date = new Date(this.post.date).toLocaleDateString();

    this.post.category = this.post.category.fields.title || 'Uncategorized';
  }
}
