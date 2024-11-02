import { Component, NgIterable, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Location, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AgilityService } from '../../../services/agility.service';
import { Title } from '@angular/platform-browser';
import { TransferState, makeStateKey } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Subscription, filter } from 'rxjs';

interface SitemapItem {
  pageID: number;
  title: string;
  contentID?: number;
}

interface Page {
  zones?: { [key: string]: any };
}

const PAGE_KEY = makeStateKey<Page | null>('page');

@Component({
  selector: 'app-agility-page',
  templateUrl: './agility-page.component.html'
})
export class AgilityPageComponent implements OnInit, OnDestroy {
  public pageInSitemap: SitemapItem | null = null;
  public page: Page | null = null;
  public pageStatus: number = 0;
  public dynamicPageItem: any = null;
  public isPreview: boolean;
  private contentReloadSubscription: Subscription | null = null;
  private routeSubscription: Subscription | null = null;

  constructor(
    private location: Location,
    private titleService: Title,
    private agilityService: AgilityService,
    private router: Router,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.pageStatus = 0;
    this.isPreview = isDevMode();
  }

  async ngOnInit(): Promise<void> {
    // Initial page load
    try {
      await this.loadPage();
      console.log('Page loaded successfully.');

      // Set up subscription to reload page content on route changes (client-side only)
      if (isPlatformBrowser(this.platformId)) {
        this.routeSubscription = this.router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe(async () => {
            await this.loadPage();
          });
      }

      // Reload content on custom content reload event
      this.contentReloadSubscription = this.agilityService.contentReloadObservable.subscribe(async () => {
        try {
          console.log('Reloading page content...');
          await this.loadPage();
          console.log('Page content reloaded successfully.');
        } catch (error) {
          console.error('Error reloading page content:', error);
        }
      });
    } catch (error) {
      console.error('Error loading page:', error);
    }
  }

  private async loadPage(): Promise<void> {
    let currentPath: string;

    if (isPlatformBrowser(this.platformId)) {
      // Client-side execution
      currentPath = location.pathname.split('?')[0] || '/home';
    } else {
      // Server-side execution
      currentPath = this.location.path().split('?')[0] || '/home';
    }

    if(currentPath === '/' || currentPath === '') {
      currentPath = '/home';
    }

    console.log('currentPath->', currentPath);

    // Check TransferState cache for page data
    const cachedPage = this.transferState.get(PAGE_KEY, null);
    if (cachedPage && isPlatformBrowser(this.platformId)) {
      this.page = cachedPage;
      this.pageStatus = 200;
      this.transferState.remove(PAGE_KEY); // Clear state after using
      console.log('Using cached page data from TransferState.');
      return;
    }

    try {
      const sitemapFlat = await this.agilityService.getSitemapFlat();
      this.pageInSitemap = sitemapFlat[currentPath];

      if (!this.pageInSitemap) {
        // Handle 404 if the page is not found
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

      // Cache page data on the server
      if (isPlatformServer(this.platformId)) {
        this.transferState.set(PAGE_KEY, this.page);
      }

      this.pageStatus = 200;
    } catch (error) {
      console.error('An error occurred: ', error);
      this.pageStatus = 500;
    }
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to avoid memory leaks
    this.contentReloadSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
  }
}