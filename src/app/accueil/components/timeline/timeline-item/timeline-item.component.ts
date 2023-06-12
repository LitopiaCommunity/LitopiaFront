import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {rightFadeInAnimation} from "../../../animations/right-fade-in.animation";
import {leftFadeInAnimation} from "../../../animations/left-fade-in.animation";

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss','./timeline-item.component.theme.scss'],
  encapsulation:ViewEncapsulation.None,
  animations:[rightFadeInAnimation,leftFadeInAnimation]
})
export class TimelineItemComponent implements OnInit {
  @Input() title!:string;
  @Input() displayDate!:string;
  @Input() datetime!:string;
  @Input() description!:string;
  @Input() image!:string;
  @Input() align!:'left'|'right'
  appear=false;

  constructor() { }

  ngOnInit(): void {
  }

  setAppear(event:boolean) {
    console.log(this.title + "just appear ? ",event)
    this.appear=true;
  }

  isAppearLeft(){
    return this.align==="left" && this.appear;
  }

  isAppearRight(){
    return this.align==="right" && this.appear;
  }
}
