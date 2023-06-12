import { Component } from '@angular/core';

import {articles} from "./season.data"

export interface TimelineArticle {
  title:string;
  displayDate:string;
  datetime:string;
  description:string;
  image:string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss','./timeline.theme.component.scss']
})
export class TimelineComponent {

  articles : TimelineArticle[] = articles;
}
