import { Component, Input, OnInit } from '@angular/core';
import { AgilityService } from '../../../agility.service';
import { htmlDecode } from 'js-htmlencode';
import { firstValueFrom } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-module-posts-listing',
  standalone: true,
  imports:[NgIf, NgForOf],
  templateUrl: './posts-listing.component.html',
})
export class ModulePostsListingComponent {
  @Input() data: any;

  public posts: any[] = [];
  public moduleData: any = null;

  constructor(private agilityService: AgilityService) {}

  async ngOnInit(): Promise<void> {
    
    this.moduleData = this.data.item.fields;
    const postsRes = await firstValueFrom(this.agilityService.getContentList('posts'));

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
