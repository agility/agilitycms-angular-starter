import { Component, OnInit, Input, TransferState, makeStateKey, isDevMode, OnChanges, SimpleChanges } from '@angular/core';
import { AgilityService } from '../../../agility.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import PrerenderedAgilityContentLists from '../../../data/content.json';

function decodeHTML(str: string): string {
  return str.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

const CATEGORIES_KEY = makeStateKey<any>('categories');

@Component({
  selector: 'app-module-featuredpost',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './featured-post.component.html'
})
export class ModuleFeaturedPost implements OnInit, OnChanges {
  @Input() data: any;

  public item: any = null;
  public date: any = null;
  public category: any = null;
  public excerpt: any = null;
  public isDevMode: boolean = false;

  constructor(private agilityService: AgilityService, private state: TransferState, private router: Router) {
    this.isDevMode = isDevMode();
  }

  public navigate(e: Event, url: string) {
    e.preventDefault();
    if (this.isDevMode || this.agilityService.isPreviewMode) {
      this.router.navigate([url]);
    } else {
      window.location.href = url;
    }
  }

  async ngOnInit(): Promise<void> {
    await this.initializeComponent();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['data']) {
      await this.initializeComponent();
    }
  }

  private async initializeComponent(): Promise<void> {
    try {
      let categoriesRes = this.state.get(CATEGORIES_KEY, null as any);

      if (!categoriesRes) {
        categoriesRes = await firstValueFrom(this.agilityService.getContentList('categories'));
        this.state.set(CATEGORIES_KEY, categoriesRes);
      }

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