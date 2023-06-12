import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-picture-content-delivery[alt][name]',
  templateUrl: './picture-content-delivery.component.html',
  styleUrls: ['./picture-content-delivery.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PictureContentDeliveryComponent implements OnInit {
  @Input() alt!:string;
  @Input() name!:string;
  @Input() fullScreenImg:boolean=false;
  @Input() classNames:string[] =[];

  AVAILABLE_WIDTH = [256,512,1024,1920,2048];
  SCREEN_SIZE = [512,1024,1920,2048];
  FORMAT = ['avif','webp','jpeg']
  constructor() { }

  ngOnInit(): void {
  }

  getWithBaseOnScreenSize(screenIndex:number){
    if(this.fullScreenImg){
      return this.AVAILABLE_WIDTH[screenIndex+1]
    }else{
      return this.AVAILABLE_WIDTH[screenIndex]
    }
  }

}
