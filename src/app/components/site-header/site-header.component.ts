import { Component, OnInit, TransferState, makeStateKey } from '@angular/core';
import { isDevMode } from '@angular/core';
import { AgilityService } from '../../agility/agility.service';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';

const SITEMAP_KEY = makeStateKey<any>('sitemap');
const HEADER_KEY = makeStateKey<any>('header');

@Component({
  selector: 'site-header',
  standalone: true,
  templateUrl: './site-header.component.html',
  imports: [RouterLink, NgIf, NgFor],
  styles: [],
})
export class SiteHeaderComponent implements OnInit {
  public siteHeader: any = null; // Initialize to null
  public links: any[] = [];
  public isPreview: boolean;
  public isDevMode: boolean = false;
  public showMobileMenu: boolean = false;

  constructor(
    private agilityService: AgilityService,
    private transferState: TransferState
  ) {
    this.isPreview = isDevMode();
    this.isDevMode = isDevMode();
  }

  toggle() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  mobileLink(e: Event) {
    this.showMobileMenu = false;
  }

  async ngOnInit(): Promise<void> {
    try {
      let sitemap = this.transferState.get(SITEMAP_KEY, null);
      let obj = this.transferState.get(HEADER_KEY, null);

      if (!sitemap) {
        sitemap = await firstValueFrom(this.agilityService.getSitemapNested());
        this.transferState.set(SITEMAP_KEY, sitemap);
      }

      if (!obj) {
        obj = await firstValueFrom(this.agilityService.getHeader());
        this.transferState.set(HEADER_KEY, obj);
      }

      if (obj && obj.fields) {
        this.siteHeader = obj.fields;
      }

      this.links = sitemap
        .filter((s: any) => s.visible.menu)
        .map((s: any) => {
          return {
            url: s.path,
            title: s.title,
          };
        });

    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }
}