import { Component, NgIterable, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Location, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { AgilityService } from '../../../services/agility.service';
import { Title } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';

interface SitemapItem {
  pageID: number;
  title: string;
  contentID?: number;
}

interface Page {
  zones?:{[key: string]: any};
}

interface Zone {
  value: NgIterable<any> | null;
}

@Component({
  selector: 'app-agility-page',
  templateUrl: './agility-page.component.html',
  styleUrls: ['./agility-page.component.css'],
})
export class AgilityPageComponent implements OnInit {
  public pageInSitemap: SitemapItem | null = null;
  public page: Page | null = null;
  public pageStatus: number = 0;
  public dynamicPageItem: any = null;
  public isPreview: boolean;
  // public zone: Zone = { value: null };

  constructor(
    private location: Location,
    private titleService: Title,
    private agilityService: AgilityService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.pageStatus = 0;
    this.isPreview = isDevMode();
  }

  async ngOnInit(): Promise<void> {
    let currentPath: string;

    if (isPlatformBrowser(this.platformId)) {
        // Client-side execution
        const currentLocation = location.href;
        console.log('Client-side location: ', currentLocation);
        currentPath = location.pathname;

        if (currentPath.indexOf('?') !== -1) {
            currentPath = currentPath.substring(0, currentPath.indexOf('?'));
        }
    } else {
        // Server-side execution
        console.log('Server-side location: ', this.location.path());
        currentPath = this.location.path(); // Use Angular's Location service for SSR

        if (currentPath.indexOf('?') !== -1) {
            currentPath = currentPath.substring(0, currentPath.indexOf('?'));
        }
    }

    if (currentPath === '/') {
        // Default path handling
        const sitemapFlat = await this.agilityService.getSitemapFlat();
        [currentPath] = Object.keys(sitemapFlat);
    }

    try {
        const sitemapFlat = await this.agilityService.getSitemapFlat();
        this.pageInSitemap = sitemapFlat[currentPath];

        if (!this.pageInSitemap) {
            this.pageStatus = 404;
            console.error(`404 - Page ${currentPath} not found in sitemap.`);
            return;
        }

        // Retrieve the page object
        this.page = await this.agilityService.getPage(this.pageInSitemap.pageID);
        console.log('Page: ', this.page);


        if (this.page?.zones) {

          console.log('page.zones: ', this.page.zones);
          // Ensure each zone's value is treated as an array of any
          Object.keys(this.page.zones).forEach((key) => {
            this.page!.zones![key] = this.page!.zones![key] as any[];
          });
        }

        // set the zone

        // Ensure zones are present in the page object
      //   if (this.page.zones) {
      //     this.page.zones = this.page.zones;
      // } else {
      //     this.page.zones = {}; // Fallback in case zones aren't defined
      // }


      // if (this.page?.zones) {
      //   console.log('MainContentZone: ', this.page.zones.MainContentZone);
      //   this.zone.value = this.page.zones.MainContentZone as NgIterable<any> | null;
      // }

        if (!this.page) {
            console.error(
                `500 - Page ${currentPath} with id ${this.pageInSitemap.pageID} could not be loaded.`
            );
            this.pageStatus = 500;
            return;
        }

        // Retrieve the dynamic page item if contentID is present
        if (this.pageInSitemap.contentID) {
            this.dynamicPageItem = await this.agilityService.getContentItem(
                this.pageInSitemap.contentID
            );
        }

        // Set the document title (only on the client)
        if (isPlatformBrowser(this.platformId)) {
            this.titleService.setTitle(this.pageInSitemap.title);
        }

        
        this.pageStatus = 200;
    } catch (error) {
        console.error('An error occurred: ', error);
        this.pageStatus = 500;
    }
}

// get iterableZoneValue(): NgIterable<any> | null {
//   console.log('Zone value: ', this.zone.value);
//   return this.zone.value as NgIterable<any>;
// }
}