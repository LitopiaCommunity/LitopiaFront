import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PictureContentDeliveryComponent
} from "./components/picture-content-delivery/picture-content-delivery.component";
import {AppearDirective} from "./directives/appear.directive";



@NgModule({
  declarations: [
    PictureContentDeliveryComponent,
    AppearDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    AppearDirective,
    PictureContentDeliveryComponent,
  ]
})
export class LitopiaCommonModule { }
