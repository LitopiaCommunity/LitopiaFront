import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MembresRoutingModule} from "./membres-routing.module";
import {MembersContainer} from "./containers/membres/members-container.component";
import {LitopiaCommonModule} from "../common/litopia-common.module";



@NgModule({
  declarations: [
    MembersContainer
  ],
  imports: [
    CommonModule,
    MembresRoutingModule,
    LitopiaCommonModule,
  ]
})
export class MembresModule { }
