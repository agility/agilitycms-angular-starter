import { NgModule, APP_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

// packages
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


// services
import { AgilityService } from './services/agility.service';
import { AgilityRouteReuseStrategy } from './services/agility-route-reuse-strategy';

// routing
import { routes } from './app.routes';

// global components
import { AppComponent } from './app.component';
import { ModuleDirective } from './module.directive';

import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { PreviewBarComponent } from './components/agility/preview-bar/preview-bar.component';

// page components
import { AgilityPageComponent } from './components/agility/page/agility-page.component';
import { AgilityModuleComponent } from './services/agility-module.component';
import { ModuleRichTextAreaComponent } from './components/agility/page-components/rich-text-area/richtextarea.component';
import { ModulePostsListingComponent } from './components/agility/page-components/posts-listing/posts-listing.component';
import { ModulePostDetailsComponent } from './components/agility/page-components/post-details/post-details.component';
import { ModuleTextBlockWithImage } from './components/agility/page-components/text-block-with-image/textblockwithimage.component';
import { ModuleFeaturedPost } from './components/agility/page-components/featured-post/featured-post.component';
import { ModuleHeading } from './components/agility/page-components/heading/heading.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    ModuleDirective,
    AgilityPageComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    AgilityModuleComponent,
    ModuleRichTextAreaComponent,
    ModulePostsListingComponent,
    ModulePostDetailsComponent,
    ModuleTextBlockWithImage,
    ModuleFeaturedPost,
    ModuleHeading,
    PreviewBarComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), FontAwesomeModule],
  providers: [
    AgilityService,
    { provide: RouteReuseStrategy, useClass: AgilityRouteReuseStrategy },
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }


