import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';
import agilityFetch from '@agility/content-fetch';
import { environment } from '../../environments/environment';

type ApiClient = any; // Temporary type definition

@Injectable({
    providedIn: 'root',
})
export class AgilityService {
    private agilityClient: ApiClient = null;
    private channelName = environment.AGILITY_SITEMAP;
    private languageCode: string = environment.AGILITY_LOCALE;

    private siteMapFlat: Promise<any> = Promise.resolve(null);
    private siteMapNested: Promise<any> = Promise.resolve(null);
    private siteHeader: any = null;
    private siteFooter: any = null;

    constructor() {
        const isPreview: boolean = isDevMode(); // Temporary value

        // Build the correct api client based on preview or dev mode
        this.agilityClient = agilityFetch.getApi({
            guid: environment.AGILITY_GUID,
            apiKey: environment.AGILITY_API_KEY,
            isPreview,
        });
        // console.log('agilityClient', this.agilityClient);
    }

    getSitemapFlat(): Promise<any> {
        this.siteMapFlat = this.agilityClient.getSitemapFlat({
            languageCode: this.languageCode,
            channelName: this.channelName,
        }).then((result: any) => {
            this.siteMapFlat = Promise.resolve(result);
            return result;
        });
        return this.siteMapFlat;
    }

    getSitemapNested(): Promise<any> {
        this.siteMapNested = this.agilityClient.getSitemapNested({
            languageCode: this.languageCode,
            channelName: this.channelName,
        }).then((result: any) => {
            this.siteMapNested = Promise.resolve(result);
            return result;
        });
        return this.siteMapNested;
    }

    getPage(pageID: number): Promise<any> {
        return this.agilityClient.getPage({
            languageCode: this.languageCode,
            pageID,
        }).then((result: any) => {
            return result;
        });
    }

    getHeader(): Promise<any> {
        if (this.siteHeader !== null) return this.siteHeader;
       
        this.siteHeader = this.agilityClient.getContentList({
            languageCode: this.languageCode,
            referenceName: 'siteheader',
        }).then((lstRes: any) => {
            if (lstRes?.items?.length > 0) {
                this.siteHeader = Promise.resolve(lstRes.items[0]);
                return lstRes.items[0];
            }
            return null;
        });
        return this.siteHeader;
    }

    getFooter(): Promise<any> {
        if (this.siteFooter !== null) return this.siteFooter;

        this.siteFooter = this.agilityClient.getContentList({
            languageCode: this.languageCode,
            referenceName: 'sitefooter',
            expandAllContentLinks: true,
        }).then((lstRes: any) => {
            if (lstRes?.items?.length > 0) {
                this.siteFooter = Promise.resolve(lstRes.items[0]);
                return lstRes.items[0];
            }
            return null;
        });
        return this.siteFooter;
    }

    getContentList(referenceName: string): Promise<any> {
        return this.agilityClient.getContentList({
            languageCode: this.languageCode,
            referenceName,
        }).then((result: any) => {
            return result;
        });
    }

    getContentItem(contentID: number): Promise<any> {
        return this.agilityClient.getContentItem({
            languageCode: this.languageCode,
            contentID,
        }).then((result: any) => {
            return result;
        });
    }
}