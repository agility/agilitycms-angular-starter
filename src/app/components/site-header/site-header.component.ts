import { Component, Inject, OnInit, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { isDevMode } from '@angular/core';
import { AgilityService } from '../../agility/agility.service';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NgIf, NgFor, isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'site-header',
  standalone: true,
  templateUrl: './site-header.component.html',
  imports: [RouterLink, NgIf, NgFor],
  styles: [],
})
export class SiteHeaderComponent implements OnInit {
  public siteHeader: any = null; // Initialize to null
  public links: any[] = [];
  public isPreviewMode: boolean;
  public isDevMode: boolean = false;
  public showMobileMenu: boolean = false;

  constructor(
    private agilityService: AgilityService,
    private transferState: TransferState,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isPreviewMode = this.agilityService.isPreviewMode;
    this.isDevMode = isDevMode();
  }

  toggle() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  mobileLink(e: Event) {
    this.showMobileMenu = false;
  }

  public navigate(e: Event, url: string) {
    e.preventDefault();
    if(this.isDevMode || this.agilityService.isPreviewMode) {
    this.router.navigate([url]);
    } else {
      window.location.href = url;
    }
  }

  async ngOnInit(): Promise<void> {


    const SITEMAP_KEY = makeStateKey<any>('sitemap');
    const HEADER_KEY = makeStateKey<any>('header');

  
      let sitemap, obj;
      if(isPlatformServer(this.platformId)) {
        sitemap = await firstValueFrom(this.agilityService.getSitemapNested());
        this.transferState.set(SITEMAP_KEY, sitemap);
        obj = await firstValueFrom(this.agilityService.getHeader());
        this.transferState.set(HEADER_KEY, obj);
      }

      if(isPlatformBrowser(this.platformId)) {
       sitemap = this.transferState.get(SITEMAP_KEY, null);
       obj = this.transferState.get(HEADER_KEY, null);
      }

      if (obj && obj.fields) {
        this.siteHeader = obj.fields;
      }

      this.links = sitemap
        .filter((s: any) => s.visible.menu)
        .map((s: any) => {
          return {
            url: s.path,
            title: s.title,
          };
        });
  
  }
}