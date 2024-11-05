import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { AgilityService } from '../../agility/agility.service';
import { RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';


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

      const sitemap = await firstValueFrom(this.agilityService.getSitemapNested());
      const obj = await firstValueFrom(this.agilityService.getHeader());

      if(obj && obj.fields) {
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
    
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  }
}