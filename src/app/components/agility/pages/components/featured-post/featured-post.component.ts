import { Component, OnInit, Input } from '@angular/core';
import { IAgilityModuleComponent } from '../agility-component.icomponent';
import { AgilityService } from '../../../../../services/agility.service';


function decodeHTML(str: string): string {
  return str.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

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
    try {
      const categoriesRes = await this.agilityService.getContentList('categories');

      this.item = this.data.item.fields;

      this.excerpt = decodeHTML(
      this.item.featuredPost.fields.content.replace(/<[^>]+>/g, '')
      );

      if (this.excerpt.length > 160) {
      this.excerpt = this.excerpt.substring(0, 160) + '...';
      }

      const categoryID = this.item.featuredPost.fields.category?.contentid;

      const category = categoriesRes.items.find(
      (c: any) => c.contentID === categoryID
      );

      this.category = category.fields.title;

      this.date = new Date(
      this.item.featuredPost.fields.date
      ).toLocaleDateString();
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
