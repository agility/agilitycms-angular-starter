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
    
    private guid = environment.AGILITY_GUID;
    public apitype: 'preview' | 'fetch' = 'fetch'; // Ensure this starts in fetch mode
    public isPreviewMode = false;
    
    private locale = environment.AGILITY_LOCALE;
    private channelName = environment.AGILITY_SITEMAP;
    
    public previewModeChange = new Subject<void>();
    private previewCookieName = 'agilitypreviewkey';
    private platformId: Object;
    private token:string;

    constructor(
        private cookieService: CookieService,
        private http: HttpClient,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.platformId = platformId;
        this.apitype = this.isPreviewMode ? 'preview' : 'fetch';
        this.token = this.isPreviewMode ? environment.AGILITY_API_PREVIEW_KEY : environment.AGILITY_API_FETCH_KEY;
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

        console.log('enterPreviewMode', token);
        this.cookieService.set(this.previewCookieName, token || 'true', { path: '/', expires: 1 });
        this.apitype = 'preview';
        this.isPreviewMode = true;
        this.token = environment.AGILITY_API_PREVIEW_KEY;
        this.previewModeChange.next();
    }

    exitPreviewMode(): void {
        if (isPlatformBrowser(this.platformId) && this.cookieService) {
            this.cookieService.delete(this.previewCookieName, '/');
        }
        this.apitype = 'fetch'
        this.isPreviewMode = false;
        this.token = environment.AGILITY_API_FETCH_KEY;
        this.previewModeChange.next();
    }

    getPreviewModeCookie(): string | null {
        if (isPlatformBrowser(this.platformId) && this.cookieService) {
            return this.cookieService.get(this.previewCookieName) || null;
        }
        return null;
    }
    
    


}
    
    

   