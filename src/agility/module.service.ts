import { Injectable } from '@angular/core';

import { ModuleRichTextAreaComponent } from '../app/module-richtextarea/module-richtextarea.component';
import { ModulePostsListingComponent } from '../app/module-posts-listing/module-posts-listing.component';
import { ModulePostDetailsComponent } from '../app/module-post-details/module-post-details.component';
import { ModuleTextBlockWithImage } from '../app/module-textblockwithimage/module-textblockwithimage.component';
import { ModuleFeaturedPost } from '../app/module-featuredpost/module-featuredpost.component';
import { ModuleHeading } from 'src/app/module-heading/module-heading.component';

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
