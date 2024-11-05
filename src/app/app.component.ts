import { isPlatformBrowser, isPlatformServer, JsonPipe } from '@angular/common';
import { Inject, afterNextRender, Component, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PageComponent } from './agility/pages/pages.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteHeaderComponent } from "./components/site-header/site-header.component";
import { ModuleRichTextAreaComponent } from './agility/pages/components/rich-text-area/richtextarea.component';
import { ModuleHeading } from './agility/pages/components/heading/heading.component';
import { ModuleFeaturedPost } from './agility/pages/components/featured-post/featured-post.component';
import { ModulePostDetailsComponent } from './agility/pages/components/post-details/post-details.component';
import { ModuleTextBlockWithImage } from './agility/pages/components/text-block-with-image/textblockwithimage.component';
import { AgilityComponentDirective } from './agility/pages/components/components.directive';
import { AgilityComponentService } from './agility/pages/components/components.service';
import { PreviewBarComponent } from './agility/pages/components/preview-bar/preview-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    PageComponent, 
    SiteFooterComponent, 
    SiteHeaderComponent,
    ModuleRichTextAreaComponent,
    AgilityComponentDirective,
    ModuleHeading,
    ModuleFeaturedPost,
    ModulePostDetailsComponent,
    ModuleTextBlockWithImage,
    PreviewBarComponent



  ],
  providers: [ AgilityComponentService],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AglityCMS Angular SSR Starter';
  ngOnInit() {
    // app level initialization
  }
}
