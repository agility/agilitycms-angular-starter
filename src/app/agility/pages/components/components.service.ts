import { Injectable, Type } from '@angular/core';

import { ModuleRichTextAreaComponent } from './rich-text-area/richtextarea.component';
import { ModulePostsListingComponent } from './posts-listing/posts-listing.component';
import { ModulePostDetailsComponent } from './post-details/post-details.component';
import { ModuleTextBlockWithImage } from './text-block-with-image/textblockwithimage.component';
import { ModuleFeaturedPost } from './featured-post/featured-post.component';
import { ModuleHeading } from './heading/heading.component';

@Injectable({
  providedIn: 'root',
})

export class AgilityComponentService {

  private componentMap: { [key: string]: Type<any> } = {
    'richtextarea': ModuleRichTextAreaComponent,
    'postslisting': ModulePostsListingComponent,
    'postdetails': ModulePostDetailsComponent,
    'textblockwithimage': ModuleTextBlockWithImage,
    'featuredpost': ModuleFeaturedPost,
    'heading': ModuleHeading,
  };

  public getComponent(componentName: string): Type<any> | null {
    const component = this.componentMap[componentName.toLowerCase()];
    if (!component) {
      console.warn(`Module component not found for ${componentName}.`);
      return null;
    }
    return component;
  } 
}
