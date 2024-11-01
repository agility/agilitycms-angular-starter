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
      
      console.log('Header object:', obj);

      // Check if obj and obj.fields are valid before accessing fields
      if (obj && obj.fields) {
        this.siteHeader = obj.fields; // Assign fields only if obj is valid
      } else {
        console.error('Header object is null or does not have fields:', obj);
        this.siteHeader = {}; // Set to an empty object or a default value
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