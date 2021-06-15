import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// agility  stuff
import { ModuleDirective } from './module.directive';
import { AgilityService } from '../agility/agility.service';
import { AgilityPageComponent } from './agility-page/agility-page.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { AgilityModuleComponent } from '../agility/agility-module.component';
import { ModuleRichTextAreaComponent } from './module-richtextarea/module-richtextarea.component';
import { RouteReuseStrategy } from '@angular/router';
import { AgilityRouteReuseStrategy } from '../agility/AgilityRouteReuseStrategy';
import { ModulePostsListingComponent } from './module-posts-listing/module-posts-listing.component';
import { ModulePostDetailsComponent } from './module-post-details/module-post-details.component';
import { PreviewBarComponent } from './preview-bar/preview-bar.component';
import { ModuleTextBlockWithImage } from './module-textblockwithimage/module-textblockwithimage.component';
import { ModuleFeaturedPost } from './module-featuredpost/module-featuredpost.component';

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
    PreviewBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [
    AgilityService,
    { provide: RouteReuseStrategy, useClass: AgilityRouteReuseStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
