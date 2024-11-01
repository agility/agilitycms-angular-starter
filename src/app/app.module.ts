import { NgModule, APP_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModuleDirective } from './module.directive';
import { AgilityService } from './services/agility.service';
import { AgilityPageComponent } from './components/agility-page/agility-page.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { AgilityModuleComponent } from './services/agility-module.component';
import { ModuleRichTextAreaComponent } from './components/agility-pageModules/rich-text-area/richtextarea.component';
import { RouteReuseStrategy } from '@angular/router';
import { AgilityRouteReuseStrategy } from './services/agility-route-reuse-strategy';
import { ModulePostsListingComponent } from './components/agility-pageModules/posts-listing/posts-listing.component';
import { ModulePostDetailsComponent } from './components/agility-pageModules/post-details/post-details.component';
import { PreviewBarComponent } from './components/preview-bar/preview-bar.component';
import { ModuleTextBlockWithImage } from './components/agility-pageModules/text-block-with-image/textblockwithimage.component';
import { ModuleFeaturedPost } from './components/agility-pageModules/featured-post/featured-post.component';
import { ModuleHeading } from './components/agility-pageModules/heading/heading.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { ServerModule } from '@angular/platform-server';

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
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [
    AgilityService,
    { provide: RouteReuseStrategy, useClass: AgilityRouteReuseStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }


