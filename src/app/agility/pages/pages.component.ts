import { isPlatformServer, isPlatformBrowser, JsonPipe, NgIf, NgFor, KeyValuePipe } from '@angular/common';
import agilityPagesData from '../data/pages.json';
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



// Define the structure of a module item
interface ModuleItem {
  module: string;
  item: {
      contentID: number;
      properties: {
          state: number;
          modified: string;
          versionID: number;
          referenceName: string;
          definitionName: string;
          itemOrder: number;
      };
      fields: {
          textblob: string;
      };
      seo: any;
  };
}

// Define the structure of zones
interface Zones {
  [key: string]: ModuleItem[];
}

// Define the structure of the page
interface Page {
  zones: Zones;
  title?: string;
  contentID?: number | null | undefined;
  // Add other properties of the page if necessary
}

@Component({
  selector: 'agility-page',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor, KeyValuePipe, AgilityComponentsDirective, AgilityComponents],
  providers: [AgilityComponentsService],
  templateUrl: 'pages.component.html',
})
export class PageComponent implements OnInit, OnDestroy {
  @ViewChild(AgilityComponentsDirective, { static: true }) agilityComponentHost!: AgilityComponentsDirective;

  public page: Page | null = null;
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

    if(this.isServer){
      // this pulls data from /data/agility-pages.json and sets it into TrasnferState
      this.preloadTransferStateData();
    }

    // this.loadPage();

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

  async preloadTransferStateData() {
    let pagePath = this.location.path().split('?')[0] || '/home';
    if (pagePath === '') pagePath = '/home';
    for (const key in agilityPagesData) {
      const pageKey = makeStateKey<any>(key);
      this.transferState.set(pageKey, (agilityPagesData as any)[key]);
    } 
  }


  async loadPage() {


    let currentPath = this.location.path().split('?')[0] || '/home';
    if (currentPath === '' || currentPath === '/favicon.png') currentPath = '/home';

    let pageKey = makeStateKey<any>(currentPath);

    const pageData = this.transferState.get(pageKey, null).page;
    const dynamicPageItem = this.transferState.get(pageKey, null).dynamicPageItem;

    if(pageData){

      this.page = pageData
      this.dynamicPageItem = dynamicPageItem

      if(!this.page){
        this.page = await firstValueFrom(this.agilityService.getPage(pageData.pageID));
        if(this.page){
          this.transferState.set(pageKey, this.page);
        } else {
          this.pageStatus = 404;
          return;
        }

        // if there's a contentID set for the page, get the dynamic page item
        if (this.page?.contentID !== undefined && this.page?.contentID !== null) {
          this.dynamicPageItem = await firstValueFrom(this.agilityService.getContentItem(this.page.contentID));
        }

        this.transferState.set(pageKey, {page: this.page, dynamicPageItem: this.dynamicPageItem});

      }

      this.titleService.setTitle(this.page?.title || 'AgilityCMS Angular SSR Starter');
      this.pageStatus = 200;

    } else {
   
       console.log('No page data found in transfer state')
    }

  }
}