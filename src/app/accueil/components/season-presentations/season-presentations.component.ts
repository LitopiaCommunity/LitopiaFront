import { Component } from '@angular/core';
import {leftFadeInAnimation} from "../../animations/left-fade-in.animation";
import {rightFadeInAnimation} from "../../animations/right-fade-in.animation";

@Component({
  selector: 'app-season-presentations',
  templateUrl: './season-presentations.component.html',
  styleUrls: ['./season-presentations.component.scss'],
  animations:[leftFadeInAnimation,rightFadeInAnimation]
})
export class SeasonPresentationsComponent {

  appearSet=new Set<string>();

  constructor() { }

  appear(title: string) {
    this.appearSet.add(title)
  }

  isAppear(title: string) {
    return this.appearSet.has(title)
  }
}
