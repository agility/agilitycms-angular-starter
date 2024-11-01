import { Component, NgIterable, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Location, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { AgilityService } from '../../../services/agility.service';
import { Title } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import { Subscription } from 'rxjs';

interface SitemapItem {
  pageID: number;
  title: string;
  contentID?: number;
}

interface Page {
  zones?: { [key: string]: any };
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
  private contentReloadSubscription: Subscription | null = null;

  constructor(
    private location: Location,
    private titleService: Title,
    private agilityService: AgilityService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.pageStatus = 0;
    this.isPreview = isDevMode();
  }

  ngOnInit(): void {
    // Initial page load
    this.loadPage();

    // Subscribe to content reloads
    this.contentReloadSubscription = this.agilityService.contentReloadObservable.subscribe(() => {
      console.log('Content reload triggered, reloading page content...');
      this.loadPage(); // Re-fetch the page content
    });
  }

  private async loadPage(): Promise<void> {
    let currentPath: string;

    if (isPlatformBrowser(this.platformId)) {
      // Client-side execution
      currentPath = location.pathname;

      if (currentPath.includes('?')) {
        currentPath = currentPath.split('?')[0];
      }
    } else {
      // Server-side execution
      currentPath = this.location.path();

      if (currentPath.includes('?')) {
        currentPath = currentPath.split('?')[0];
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

      if (this.page?.zones) {
        Object.keys(this.page.zones).forEach((key) => {
          this.page!.zones![key] = this.page!.zones![key] as any[];
        });
      }

      if (!this.page) {
        console.error(`500 - Page ${currentPath} with id ${this.pageInSitemap.pageID} could not be loaded.`);
        this.pageStatus = 500;
        return;
      }

      // Retrieve the dynamic page item if contentID is present
      if (this.pageInSitemap.contentID) {
        this.dynamicPageItem = await this.agilityService.getContentItem(this.pageInSitemap.contentID);
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

  ngOnDestroy(): void {
    // Clean up subscription to avoid memory leaks
    this.contentReloadSubscription?.unsubscribe();
  }
}