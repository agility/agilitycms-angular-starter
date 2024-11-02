import { Component, Input, OnInit } from '@angular/core';
import { IAgilityModuleComponent } from '../agility-component.icomponent';
import { AgilityService } from '../../../../../services/agility.service';
import { htmlDecode } from 'js-htmlencode';

@Component({
  selector: 'app-module-posts-listing',
  templateUrl: './posts-listing.component.html',
})
export class ModulePostsListingComponent implements IAgilityModuleComponent {
  @Input() data: any;

  public posts: any[] = [];
  public moduleData: any = null;

  constructor(private agilityService: AgilityService) {}

  async ngOnInit(): Promise<void> {
    const postsRes = await this.agilityService.getContentList('posts');

    this.moduleData = this.data.item.fields;

    this.posts = postsRes.items.map((p: any) => {
      return {
        title: p.fields.title,
        slug: p.fields.slug,
        date: new Date(p.fields.date).toLocaleDateString(),
        image: p.fields.image,
        content: p.fields.content,
        category: p.fields.category.fields.title || 'Uncategorized',
      };
    });
  }
}
