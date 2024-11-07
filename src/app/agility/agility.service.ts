import { Inject, Injectable, PLATFORM_ID, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class AgilityService {
    private serverUrl = 'https://api.aglty.io';
    
    private guid: string = environment.AGILITY_GUID;
    private apitype: 'preview' | 'fetch' = 'fetch'; // Ensure this starts in fetch mode
    private locale = environment.AGILITY_LOCALE;
    private channelName = environment.AGILITY_SITEMAP;
    private previewCookieName = 'agilitypreviewkey';
    private platformId: Object;

    public previewModeChange = new Subject<void>();

    public isPreviewMode = false;
    


    constructor(
        private cookieService: CookieService,
        private http: HttpClient,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.platformId = platformId;
        this.apitype = this.isPreviewMode ? 'preview' : 'fetch';
    }

   
    getPreviewModeChange(): Observable<void> {
        return this.previewModeChange.asObservable();
    }

    private createHeaders(): HttpHeaders {
        return new HttpHeaders().set('Apikey', this.isPreviewMode ? environment.AGILITY_API_PREVIEW_KEY : environment.AGILITY_API_FETCH_KEY);
    }

    getSitemapFlat(): Observable<any> {
        const apiUrl = `${this.serverUrl}/${this.guid}/${this.apitype}/${this.locale}/sitemap/flat/${this.channelName}`; 
        return this.http.get(apiUrl, { headers: this.createHeaders() }).pipe(
            catchError((error: any) => {
                console.error('An error occurred on getSitemapFlat():', error);
                return throwError(() => error);
            })
        );
    }

    getSitemapNested(): Observable<any> {
        const apiUrl = `${this.serverUrl}/${this.guid}/${this.apitype}/${this.locale}/sitemap/nested/${this.channelName}`; 
        return this.http.get(apiUrl, { headers: this.createHeaders() }).pipe(
            catchError((error: any) => {
                console.error('An error occurred on getSitemapNested():', error);
                return throwError(() => error);
            })
        );
    }

    getPage(pageID: number): Observable<any> {
        const apiUrl = `${this.serverUrl}/${this.guid}/${this.apitype}/${this.locale}/page/${pageID}`;
        return this.http.get(apiUrl, { headers: this.createHeaders() }).pipe(
            catchError((error: any) => {
                console.error('An error occurred on getPage():', error);
                return throwError(() => error);
            })
        );
    }

    getHeader(): Observable<any> {
        const apiUrl = `${this.serverUrl}/${this.guid}/${this.apitype}/${this.locale}/list/siteheader`;
        return this.http.get(apiUrl, { headers: this.createHeaders() }).pipe(
            map((response: any) => response.items[0]),
            catchError((error: any) => {
                console.error('An error occurred on getHeader():', error);
                return throwError(() => error);
            })
        );
    }

    getContentList(referenceName: string): Observable<any> {
        const apiUrl = `${this.serverUrl}/${this.guid}/${this.apitype}/${this.locale}/list/${referenceName}`;
        return this.http.get(apiUrl, { headers: this.createHeaders() }).pipe(
            catchError((error: any) => {
                console.error('An error occurred on getContentList():', error);
                return throwError(() => error);
            })
        );
    }

    getContentItem(contentID: number): Observable<any> {
        const apiUrl = `${this.serverUrl}/${this.guid}/${this.apitype}/${this.locale}/item/${contentID}`;
        return this.http.get(apiUrl, { headers: this.createHeaders() }).pipe(
            catchError((error: any) => {
                console.error('An error occurred on getContentItem():', error);
                return throwError(() => error);
            })
        );
    }

    
    enterPreviewMode(token?: string): void {
        this.cookieService.set(this.previewCookieName, token || 'true');
        this.apitype = 'preview';
        this.isPreviewMode = true;
        this.previewModeChange.next();
    }

    exitPreviewMode(): void {
        this.cookieService.delete(this.previewCookieName);
        this.apitype = 'fetch'
        this.isPreviewMode = false;
        this.previewModeChange.next();
    }


}
    
    

   