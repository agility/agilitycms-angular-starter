import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { AgilityService } from '../../services/agility.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styles: [],
})
export class SiteHeaderComponent implements OnInit {
  public siteHeader: any = null; // Initialize to null
  public links: any[] = [];
  public isPreview: boolean;
  public showMobileMenu: boolean = false;

  constructor(private agilityService: AgilityService) {
    this.isPreview = isDevMode();
  }

  toggle() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  mobileLink(e: Event) {
    this.showMobileMenu = false;
  }

  async ngOnInit(): Promise<void> {
    try {
      // Get sitemap
      const sitemap = await this.agilityService.getSitemapNested();

      // Get header content item
      const obj = await this.agilityService.getHeader();

      if (obj && obj.fields) {
        this.siteHeader = obj.fields;
      } else {
        this.siteHeader = {};
      }

      // Get visible links in sitemap
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