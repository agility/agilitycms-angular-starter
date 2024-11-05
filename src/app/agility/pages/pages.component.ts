import { isPlatformServer, isPlatformBrowser, JsonPipe, NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { Component, Inject, makeStateKey, OnInit, PLATFORM_ID, TransferState, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { AgilityService } from '../agility.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { AgilityComponentDirective } from './components/components.directive';
import { AgilityComponentService } from './components/components.service';
import { AgilityComponent } from "./components/components.component";

const PAGE_KEY = makeStateKey<any>('page');

@Component({
  selector: 'agility-page',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor, KeyValuePipe, AgilityComponentDirective, AgilityComponent],
  providers: [AgilityComponentService],

  templateUrl: 'pages.component.html',
})
export class PageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(AgilityComponentDirective, { static: true }) agilityComponentHost!: AgilityComponentDirective;

  public page: { zones: any[] } | null = null;
  public pageStatus: number = 0;
  public title = 'AgilityCMS Angular SSR Starter';
  public isServer: boolean = false;
  public dynamicPageItem: any = null;
  private platformId: Object;
  private contentReloadSubscription: Subscription | null = null;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private agilityService: AgilityService,
    private location: Location,
    private titleService: Title,
    private router: Router,
    private transferState: TransferState,
    private componentMappingService: AgilityComponentService

  ) {
    this.isServer = isPlatformServer(platformId);
    this.platformId = platformId;

  }

  ngOnInit() {
    this.makeApiRequest()
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.makeApiRequest();
      }
    });

    this.contentReloadSubscription = this.agilityService.contentReloadSubject.subscribe(() => {
      console.log('Content Reloaded');
      this.makeApiRequest();
    });
  }


  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // this.loadComponents();
    }
  }

  ngOnDestroy() {
    if (this.contentReloadSubscription) {
      this.contentReloadSubscription.unsubscribe();
    }
  }


  async makeApiRequest() {
    let currentPath = this.location.path().split('?')[0] || '/home';
    if(currentPath === '' || currentPath==='/favicon.png') currentPath = '/home'

    let pageKey = makeStateKey<any>('page'+currentPath);
    let sitemapKey = makeStateKey<any>('sitemap'+currentPath);
    let dynamicPageItemKey = makeStateKey<any>('dynamicPageItem'+currentPath);

    try {


      let sitemap = this.transferState.get(sitemapKey, null);
      if(!sitemap) {
       sitemap = await firstValueFrom(this.agilityService.getSitemapFlat());
       this.transferState.set(sitemapKey, sitemap);
      }

      const pageInSitemap = sitemap[currentPath];
      if (!pageInSitemap) {
        this.pageStatus = 404;
        return;
      }
       
      this.page = await firstValueFrom(this.agilityService.getPage(pageInSitemap.pageID))
     
      if (pageInSitemap.contentID) {
        this.dynamicPageItem = await firstValueFrom(this.agilityService.getContentItem(pageInSitemap.contentID));
        this.transferState.set(dynamicPageItemKey, this.dynamicPageItem);
      }

      // this.page = pageData
      this.titleService.setTitle(pageInSitemap.title);
      this.pageStatus = 200;
      this.transferState.set(pageKey, this.page);

    } catch (error) {
      console.error('Error making API request', error);
    }
  }

  loadComponents() {
    if (this.page && this.page.zones) {
      for (const zoneKey in this.page.zones) {
        if (this.page.zones.hasOwnProperty(zoneKey)) {
          const zone = this.page.zones[zoneKey];
          for (const moduleRef of zone) {
            this.loadComponent(moduleRef);
          }
        }
      }
    }
  }

  loadComponent(moduleRef: any) {
    const component = this.componentMappingService.getComponent(moduleRef.module);
    if (component) {
      const viewContainerRef = this.agilityComponentHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(component);
      (componentRef.instance as any).moduleObj = moduleRef.item;
      (componentRef.instance as any).page = this.page;
      (componentRef.instance as any).dynamicPageItem = this.dynamicPageItem;
    }
  }

 
}