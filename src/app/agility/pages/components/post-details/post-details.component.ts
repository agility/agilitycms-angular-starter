import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-post-details',
  templateUrl: './post-details.component.html',
  standalone: true,
})
export class ModulePostDetailsComponent implements OnInit {
  @Input() data: any;
  public post: any = null;

  constructor() {}

  ngOnInit() {
    this.post = this.data.dynamicPageItem.fields;
    this.post.date = new Date(this.post.date).toLocaleDateString();
    this.post.title = this.post.title;
    this.post.category = this.post.category || 'Uncategorized';
  }
}
