import { Component, OnInit, Inject, TransferState, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, Location } from '@angular/common';
import { AgilityService } from '../../services/agility.service'; // Import the AgilityService
import { ActivatedRoute, Router } from '@angular/router';
const USERS_KEY = makeStateKey<any>('users');

@Component({
  selector: 'agility-page',
  standalone: true,
  templateUrl: './agility-page.component.html',
  imports: [CommonModule]
})
export class AgilityPageComponent implements OnInit {
  public result: any;
  public resultHttpClient: any;
  public resultPost: any;

  constructor(
    private http: HttpClient,
    private transferState: TransferState,
    @Inject('ORIGIN_URL') public baseUrl: string,
    private agilityService: AgilityService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location

  ) {
    console.log(`ORIGIN_URL=${baseUrl}`);
    console.log('location', location);
  }

  ngOnInit(): void {
    console.log('AgilityPageComponent initialized');
    // console.log('Current route:', this.route.snapshot.url);
    // console.log('route', this.route)

    // Check if data is already in TransferState
    if (this.transferState.hasKey(USERS_KEY)) {
      // Retrieve data from TransferState
      this.result = this.transferState.get(USERS_KEY, null);
      this.resultHttpClient = this.result; // Set to avoid duplicate fetch
      this.transferState.remove(USERS_KEY); // Clean up TransferState
    } else {
      // Fetch data only if it's not in TransferState

      // Subscribe to params to get the latest slug value
      this.route.params.subscribe((params) => {
        const pageSlug = params['slug'];
        console.log('pageSlug 1:', pageSlug);
        console.log('params:', params);

        if (pageSlug) {
          this.agilityService.getSitemapFlat().then((sitemap) => {
            const pageEntry = sitemap[pageSlug];
            if (pageEntry) {
              const pageID = pageEntry.pageID;
              return this.agilityService.getPage(pageID);
            } else {
              throw new Error('Page not found in sitemap');
            }
          }).then((result) => {
            this.result = result;
            this.resultHttpClient = result; // Avoid duplicate fetch
            // Store in TransferState
            this.transferState.set(USERS_KEY, result);
          }).catch((error) => {
            console.error('Error fetching page:', error);
          });
        } else {
          console.error('Slug parameter is missing');
        }
      });
    }
  }
}