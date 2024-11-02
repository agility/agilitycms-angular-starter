import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import { AgilityService } from './services/agility.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'AgilityCMS Angular SSR';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agilityService: AgilityService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        let previewToken = this.route.snapshot.queryParamMap.get('previewmode');

        // SSR workaround: Only access window if running in the browser
        if (!previewToken && isPlatformBrowser(this.platformId)) {
          const params = new URLSearchParams(window.location.search);
          previewToken = params.get('previewmode');
        }

        if (previewToken) {
          this.agilityService.enterPreviewMode(previewToken);

          // Optionally remove the previewmode parameter from the URL
          this.router.navigate([], {
            queryParams: { previewmode: null },
            queryParamsHandling: 'merge',
          });
        }
      });
  }

  
}