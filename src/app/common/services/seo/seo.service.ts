import { Injectable } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta, private router: Router) { }

  generateTags({ title = '', description = '', image = '' }) {
    if (title.length>65){
      throw new Error("Title should not have a length of more than 65 character")
    }
    if(description.length>155){
      throw new Error("Description should not have a length of more than 155 character")
    }
    this.title.setTitle(title);
    this.meta.addTags([
      { name: 'dеѕсrірtіоn', content:description},
      // Open Graph
      { name: 'og:url', content: `https://litopia.fr${this.router.url}` },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
      // Twitter Card
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@litopia' },
    ]);
  }
}
