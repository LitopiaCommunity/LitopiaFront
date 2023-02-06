import {animate, style, transition, trigger} from "@angular/animations";

export const upFadeInAnimation =  trigger('upFadeInAnimation',[
  transition('*=>*',[
    style({transform: 'translateY(40px)',opacity:0}),
    animate('1.5s cubic-bezier(0.680, -0.550, 0.265, 1.550)',style({transform: 'translateY(0)',opacity:1}))
  ])
])
