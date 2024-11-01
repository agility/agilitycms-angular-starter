import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PreviewInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = req.url;

    // Check if the request URL contains '?preview'
    if (url.includes('?preview')) {
      // Modify the request as needed (e.g., add headers)
      const modifiedReq = req.clone({
        setHeaders: {
          'X-Preview-Mode': 'true' // Example header to indicate preview mode
        }
      });
      return next.handle(modifiedReq);
    }

    // If not in preview mode, just pass the request as is
    return next.handle(req);
  }
}