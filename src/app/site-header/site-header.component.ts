import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { AgilityService } from '../../agility/agility.service';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styles: [],
})
export class SiteHeaderComponent implements OnInit {
  public siteHeader: any = null;
  public links: any[] = [];
  public isPreview: boolean;

  public showMobileMenu: boolean = false;

  constructor(private agilityService: AgilityService) {
    this.isPreview = isDevMode();
  }

  toggle() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  mobileLink(e) {
    this.showMobileMenu = false;
  }

  async ngOnInit(): Promise<void> {
    // get sitemap
    let sitemap = await this.agilityService.getSitemapNested();

    // get header content item
    let obj = await this.agilityService.getHeader();
    this.siteHeader = obj.fields;

    // get visible links in sitemap
    this.links = sitemap
      .filter((s) => s.visible.menu)
      .map((s) => {
        return {
          url: s.path,
          title: s.title,
        };
      });
  }
}
