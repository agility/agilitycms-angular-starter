import { Injectable } from '@angular/core';
import agilityFetch from '@agility/content-fetch';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

type ApiClient = any;

@Injectable({
    providedIn: 'root',
})
export class AgilityService {
    private agilityClient: ApiClient | null = null;
    private channelName = environment.AGILITY_SITEMAP;
    private languageCode: string = environment.AGILITY_LOCALE;
    private previewCookieName = 'previewmode';
    private contentReloadSubject = new Subject<void>();

    // Observable to notify components when content has been reloaded
    contentReloadObservable = this.contentReloadSubject.asObservable();

    constructor(private cookieService: CookieService) {
    }

    private getApiClient(): ApiClient {
        if (!this.agilityClient) {
            const isPreview = this.isPreviewMode();
            const apiKey = isPreview ? environment.AGILITY_API_PREVIEW_KEY : environment.AGILITY_API_FETCH_KEY;
            
            this.agilityClient = agilityFetch.getApi({
                guid: environment.AGILITY_GUID,
                apiKey: apiKey,
                isPreview,
            });

            console.log(`Agility Client created with isPreview: ${isPreview}`);
        }
        return this.agilityClient;
    }

    getSitemapFlat(): Promise<any> {
        return this.getApiClient().getSitemapFlat({
            languageCode: this.languageCode,
            channelName: this.channelName,
        });
    }

    getSitemapNested(): Promise<any> {
        return this.getApiClient().getSitemapNested({
            languageCode: this.languageCode,
            channelName: this.channelName,
        });
    }

    getPage(pageID: number): Promise<any> {
        return this.getApiClient().getPage({
            languageCode: this.languageCode,
            pageID,
        });
    }

    getHeader(): Promise<any> {
        return this.getApiClient().getContentList({
            languageCode: this.languageCode,
            referenceName: 'siteheader',
        }).then((lstRes: any) => lstRes?.items[0] || null);
    }

    getFooter(): Promise<any> {
        return this.getApiClient().getContentList({
            languageCode: this.languageCode,
            referenceName: 'sitefooter',
            expandAllContentLinks: true,
        }).then((lstRes: any) => lstRes?.items[0] || null);
    }

    getContentList(referenceName: string): Promise<any> {
        return this.getApiClient().getContentList({
            languageCode: this.languageCode,
            referenceName,
        });
    }

    getContentItem(contentID: number): Promise<any> {
        return this.getApiClient().getContentItem({
            languageCode: this.languageCode,
            contentID,
        });
    }

    enterPreviewMode(token?: string): void {
        console.log('Entering preview mode');
        this.cookieService.set(this.previewCookieName, token || 'true', { path: '/', expires: 1 });
        this.agilityClient = null; // Clear the client so it reinitializes with preview mode
        this.contentReloadSubject.next();
    }

    exitPreviewMode(): void {
        console.log('Exiting preview mode');
        this.cookieService.delete(this.previewCookieName, '/');
        this.agilityClient = null; // Clear the client so it reinitializes without preview mode
        this.contentReloadSubject.next();
    }
    
    getPreviewModeCookie(): string | null {
        return this.cookieService.get(this.previewCookieName) || null;
    }

    isPreviewMode(): boolean {
        return this.getPreviewModeCookie() !== null;
    }
}