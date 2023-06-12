import { Component } from '@angular/core';

@Component({
  selector: 'app-fullscreen-img-text',
  templateUrl: './fullscreen-img-text.component.html',
  styleUrls: ['./fullscreen-img-text.component.scss']
})
export class FullscreenImgTextComponent {
  appearSet=new Set<string>();

  constructor() { }

  isAppear(title: string) {
    this.appearSet.add(title)
  }

  appear(title: string) {
    return this.appearSet.has(title)
  }
}
