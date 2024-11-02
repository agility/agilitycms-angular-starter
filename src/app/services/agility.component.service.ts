import { Injectable } from '@angular/core';

import { ModuleRichTextAreaComponent } from '../components/agility/pages/components/rich-text-area/richtextarea.component';
import { ModulePostsListingComponent } from '../components/agility/pages/components/posts-listing/posts-listing.component';
import { ModulePostDetailsComponent } from '../components/agility/pages/components/post-details/post-details.component';
import { ModuleTextBlockWithImage } from '../components/agility/pages/components/text-block-with-image/textblockwithimage.component';
import { ModuleFeaturedPost } from '../components/agility/pages/components/featured-post/featured-post.component';
import { ModuleHeading } from '../components/agility/pages/components/heading/heading.component';

@Injectable({
  providedIn: 'root',
})

/**
 * Use this service to define all of the components that work as Agility Modules
 */
export class AgilityComponentService {
  constructor() {}

  getModule(moduleName: string) {
    switch (moduleName.toLowerCase()) {
      case 'richtextarea':
        return ModuleRichTextAreaComponent;
      case 'postslisting':
        return ModulePostsListingComponent;
      case 'postdetails':
        return ModulePostDetailsComponent;
      case 'textblockwithimage':
        return ModuleTextBlockWithImage;
      case 'featuredpost':
        return ModuleFeaturedPost;
      case 'heading':
        return ModuleHeading;
    }

    console.warn(`Module component not found for ${moduleName}.`);
    return null;
  }
}
