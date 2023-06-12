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
import {FooterComponent} from "./components/layout/footer/footer.component";
import {NavbarComponent} from "./components/layout/navbar/navbar.component";
import {ThemeChooserComponent} from "./components/layout/navbar/theme-chooser/theme-chooser.component";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterModule} from "@angular/router";
import {ExtendedModule, FlexModule} from "@angular/flex-layout";
import {MatTooltipModule} from "@angular/material/tooltip";



@NgModule({
  declarations: [
    PictureContentDeliveryComponent,
    PageHeaderComponent,
    AppearDirective,
    AuthPopupComponent,
    FooterComponent,
    NavbarComponent,
    ThemeChooserComponent,
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    FlexModule,
    MatTooltipModule,
    ExtendedModule,
  ],
  exports: [
    AppearDirective,
    PictureContentDeliveryComponent,
    PageHeaderComponent,
    FooterComponent,
    NavbarComponent,
  ]
})
export class LitopiaCommonModule { }
