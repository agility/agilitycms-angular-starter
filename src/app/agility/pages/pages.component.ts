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
import { PreviewBarComponent } from './components/preview-bar/preview-bar.component';
import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { SiteFooterComponent } from '../../components/site-footer/site-footer.component';


@Component({
  selector: 'agility-page',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor, KeyValuePipe,  AgilityComponents, PreviewBarComponent, SiteHeaderComponent, SiteFooterComponent],
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

    if(isPlatformServer(this.platformId)) {
        this.loadPage();
    }

    if(isPlatformBrowser(this.platformId)) {
      let pageKey = makeStateKey<any>('page');
      let dynamicPageItemKey = makeStateKey<any>('dynamicPageItem');
      this.page = this.transferState.get(pageKey, null);
      this.dynamicPageItem = this.transferState.get(dynamicPageItemKey, null);
      this.transferState.remove(pageKey);
      this.pageStatus = 200;
    }

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadPage();
      }
    });

    this.previewModeSubscription = this.agilityService.previewModeChange.subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.loadPage();
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


  async loadPage() {


    let currentPath = this.location.path().split('?')[0] || '/home';
    if (currentPath === '' || currentPath === '/favicon.png') currentPath = '/home';

    let pageKey = makeStateKey<any>('page');
    let dynamicPageItemKey = makeStateKey<any>('dynamicPageItem');

    const sitemap = await firstValueFrom(this.agilityService.getSitemapFlat());
    const pageInSitemap = sitemap[currentPath];

    if (!pageInSitemap) {
      this.pageStatus = 404;
      return;
    }

    if (pageInSitemap.contentID) {
        this.dynamicPageItem = await firstValueFrom(this.agilityService.getContentItem(pageInSitemap.contentID));
    }

    this.page = await firstValueFrom(this.agilityService.getPage(pageInSitemap.pageID));
    this.titleService.setTitle(pageInSitemap.title);
    this.pageStatus = 200;
    this.transferState.set(dynamicPageItemKey, this.dynamicPageItem);
    this.transferState.set(pageKey, this.page);


  }
}
