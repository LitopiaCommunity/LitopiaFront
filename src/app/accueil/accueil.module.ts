import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AProposComponent} from "./components/a-propos/a-propos.component";
import {FullscreenImgTextComponent} from "./components/fullscreen-img-text/fullscreen-img-text.component";
import {SeasonPresentationsComponent} from "./components/season-presentations/season-presentations.component";
import {TimelineComponent} from "./components/timeline/timeline.component";
import {AccueilContainer} from "./containers/acceuil/accueil-container.component";
import {AccueilRoutingModule} from "./accueil-routing.module";
import {TimelineItemComponent} from "./components/timeline/timeline-item/timeline-item.component";
import {MatIconModule} from "@angular/material/icon";
import {LitopiaCommonModule} from "../common/litopia-common.module";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    AProposComponent,
    FullscreenImgTextComponent,
    SeasonPresentationsComponent,
    TimelineComponent,
    TimelineItemComponent,
    AccueilContainer,
  ],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    MatIconModule,
    LitopiaCommonModule,
    MatButtonModule,
  ]
})
export class AccueilModule { }
