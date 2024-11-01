import { Component, OnInit, Input } from '@angular/core';
import { htmlDecode } from 'js-htmlencode';
import { IAgilityModuleComponent } from '../../../services/agility.module.icomponent';
import { AgilityService } from '../../../services/agility.service';

@Component({
  selector: 'app-module-featuredpost',
  templateUrl: './featured-post.component.html',
})
export class ModuleFeaturedPost implements IAgilityModuleComponent {
  @Input() data: any;

  public item: any = null;
  public date: any = null;
  public category: any = null;
  public excerpt: any = null;

  constructor(private agilityService: AgilityService) {}

  async ngOnInit(): Promise<void> {
    // fetch categories content list
    const categoriesRes = await this.agilityService.getContentList(
      'categories'
    );

    // fields for this item
    this.item = this.data.item.fields;

    // create excerpt
    this.excerpt = htmlDecode(
      this.item.featuredPost.fields.content.replace(/<[^>]+>/g, '')
    );

    if (this.excerpt.length > 160) {
      this.excerpt = this.excerpt.substring(0, 160) + '...';
    }

    // get category id
    const categoryID = this.item.featuredPost.fields.category?.contentid;

    // find matching category
    const category = categoriesRes.items.find(
      (c: any) => c.contentID === categoryID
    );

    // set featured post category
    this.category = category.fields.title;

    // format date
    this.date = new Date(
      this.item.featuredPost.fields.date
    ).toLocaleDateString();
  }
}
