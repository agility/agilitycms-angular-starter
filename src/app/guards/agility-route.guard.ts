import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AgilityService } from '../services/agility.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateAgilityRoutes implements CanActivate {
  constructor(
    private agilityService: AgilityService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const slug = route.paramMap.get('slug') || '';
    if (slug === '404') {
      return of(false);
    }
    
    return from(this.agilityService.getSitemapFlat()).pipe(
      map((sitemap: any[]) => {
        const isValid = Object.keys(sitemap).includes('/'+slug);    
        if (!isValid) {
          this.router.navigate(['/404']);
        }
        return isValid;
      }),
      catchError((error: Error) => {
        console.error('Error fetching sitemap', error);
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }
}