import { isPlatformServer, isPlatformBrowser, JsonPipe, NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { Component, Inject, makeStateKey, OnInit, PLATFORM_ID, TransferState, ViewChild, OnDestroy } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { AgilityService } from '../agility.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { AgilityComponentsDirective } from './components/components.directive';
import { AgilityComponentsService } from './components/components.service';
import { AgilityComponents } from "./components/components.component";
import { isDevMode } from '@angular/core';


@Component({
  selector: 'agility-page',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor, KeyValuePipe, AgilityComponentsDirective, AgilityComponents],
  providers: [AgilityComponentsService],
  templateUrl: 'pages.component.html',
})
export class PageComponent implements OnInit, OnDestroy {
  @ViewChild(AgilityComponentsDirective, { static: true }) agilityComponentHost!: AgilityComponentsDirective;

  public page: { zones: any[] } | null = null;
  public pageStatus: number = 0;
  public title = 'AgilityCMS Angular SSR Starter';
  public isServer: boolean = false;
  public dynamicPageItem: any = null;
  private platformId: Object;
  private previewModeSubscription: Subscription | null = null;
  private routerSubscription: Subscription | null = null;
  public isDevMode: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private agilityService: AgilityService,
    private location: Location,
    private titleService: Title,
    private router: Router,
    private transferState: TransferState,

  ) {
    this.isServer = isPlatformServer(platformId);
    this.isDevMode = isDevMode();
    this.platformId = platformId;
  }

  ngOnInit() {

    if (this.isServer) {
      this.makeApiRequest();
    }

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.makeApiRequest();
      }
    });

    this.previewModeSubscription = this.agilityService.previewModeSubject.subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.makeApiRequest();
      }
    });
  }

  ngOnDestroy() {
    if (this.previewModeSubscription) {
      this.previewModeSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }


  async makeApiRequest() {

    let currentPath = this.location.path().split('?')[0] || '/home';
    if (currentPath === '' || currentPath === '/favicon.png') currentPath = '/home';

    let pageKey = makeStateKey<any>('page' + currentPath.replaceAll('/', '-'));
    let sitemapKey = makeStateKey<any>('page-sitemap');
    let dynamicPageItemKey = makeStateKey<any>('dynamicPageItem' + currentPath.replaceAll('/', '-'));

    try {
      let sitemap = this.transferState.get(sitemapKey, null);
      if (!sitemap) {
        sitemap = await firstValueFrom(this.agilityService.getSitemapFlat());
      }
      const pageInSitemap = sitemap[currentPath];
      if (!pageInSitemap) {
        this.pageStatus = 404;
        return;
      }

      if (pageInSitemap.contentID) {
        this.dynamicPageItem = this.transferState.get(dynamicPageItemKey, null);
        this.transferState.remove(dynamicPageItemKey);
        if (!this.dynamicPageItem) {
          this.dynamicPageItem = await firstValueFrom(this.agilityService.getContentItem(pageInSitemap.contentID));
        }
      }

      this.titleService.setTitle(pageInSitemap.title);
      this.pageStatus = 200;

      this.page = this.transferState.get(pageKey, null);
      this.transferState.remove(pageKey);
      if (!this.page) {
        this.page = await firstValueFrom(this.agilityService.getPage(pageInSitemap.pageID));
      }


      if (this.isServer) {
        this.transferState.set(sitemapKey, sitemap);
        this.transferState.set(dynamicPageItemKey, this.dynamicPageItem);
        this.transferState.set(pageKey, this.page);
      }

    } catch (error) {
      console.error('Error making API request', error);
      this.pageStatus = 500;
    }
  }
}