import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PictureContentDeliveryComponent
} from "./components/picture-content-delivery/picture-content-delivery.component";
import {AppearDirective} from "./directives/appear.directive";
import {PageHeaderComponent} from "./components/page-header/page-header.component";
import {AuthPopupComponent} from "./components/auth-popup/auth-popup.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    PictureContentDeliveryComponent,
    PageHeaderComponent,
    AppearDirective,
    AuthPopupComponent,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    AppearDirective,
    PictureContentDeliveryComponent,
    PageHeaderComponent,
  ]
})
export class LitopiaCommonModule { }
