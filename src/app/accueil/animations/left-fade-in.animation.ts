import {animate, style, transition, trigger} from "@angular/animations";

export const leftFadeInAnimation =  trigger('leftFadeInAnimation',[
  transition('*=>*',[
    style({transform: 'translateX(-20px)',opacity:0}),
    animate('1.5s cubic-bezier(0.680, -0.550, 0.265, 1.550)',style({transform: 'translateX(0)',opacity:1}))
  ])
])
