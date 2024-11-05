import { Component } from '@angular/core';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { SiteHeaderComponent } from "./components/site-header/site-header.component";
import { ModuleRichTextAreaComponent } from './agility/pages/components/rich-text-area/richtextarea.component';
import { ModuleHeading } from './agility/pages/components/heading/heading.component';
import { ModuleFeaturedPost } from './agility/pages/components/featured-post/featured-post.component';
import { ModulePostDetailsComponent } from './agility/pages/components/post-details/post-details.component';
import { ModuleTextBlockWithImage } from './agility/pages/components/text-block-with-image/textblockwithimage.component';
import { PreviewBarComponent } from './agility/pages/components/preview-bar/preview-bar.component';
import { PageComponent } from './agility/pages/pages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    PageComponent, 
    SiteFooterComponent, 
    SiteHeaderComponent,
    PreviewBarComponent,
    ModuleRichTextAreaComponent,
    ModuleHeading,
    ModuleFeaturedPost,
    ModulePostDetailsComponent,
    ModuleTextBlockWithImage,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AglityCMS Angular SSR Starter';
  ngOnInit() {
    // app level initialization
  }
}
