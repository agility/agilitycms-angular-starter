import { Injectable } from '@angular/core';

import { ModuleRichTextAreaComponent } from '../components/agility-pageModules/rich-text-area/richtextarea.component';
import { ModulePostsListingComponent } from '../components/agility-pageModules/posts-listing/posts-listing.component';
import { ModulePostDetailsComponent } from '../components/agility-pageModules/post-details/post-details.component';
import { ModuleTextBlockWithImage } from '../components/agility-pageModules/text-block-with-image/textblockwithimage.component';
import { ModuleFeaturedPost } from '../components/agility-pageModules/featured-post/featured-post.component';
import { ModuleHeading } from '../components/agility-pageModules/heading/heading.component';

@Injectable({
  providedIn: 'root',
})

/**
 * Use this service to define all of the components that work as Agility Modules
 */
export class ModuleService {
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
