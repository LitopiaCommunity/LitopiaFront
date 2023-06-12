import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {leftFadeInAnimation} from "../../animations/left-fade-in.animation";
import {rightFadeInAnimation} from "../../animations/right-fade-in.animation";

@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.scss'],
  encapsulation:ViewEncapsulation.None,
  animations:[leftFadeInAnimation,rightFadeInAnimation],
})
export class AProposComponent implements OnInit {
  appearSet=new Set<string>();
  constructor() { }

  ngOnInit(): void {
  }

  appear(appearName: string) {
    this.appearSet.add(appearName);
  }

  isAppear(appearName:string){
    return this.appearSet.has(appearName)
  }
}
