import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PictureContentDeliveryComponent
} from "./components/picture-content-delivery/picture-content-delivery.component";
import {AppearDirective} from "./directives/appear.directive";
import {PageHeaderComponent} from "./components/page-header/page-header.component";



@NgModule({
  declarations: [
    PictureContentDeliveryComponent,
    PageHeaderComponent,
    AppearDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AppearDirective,
    PictureContentDeliveryComponent,
    PageHeaderComponent,
  ]
})
export class LitopiaCommonModule { }
