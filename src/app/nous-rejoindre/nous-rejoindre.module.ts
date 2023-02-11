import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NousRejoindreRoutingModule} from "./nous-rejoindre-routing.module";
import {NousRejoindreComponent} from "./containers/nous-rejoindre/nous-rejoindre.component";
import {NousRejoindreFormComponent} from "./containers/nous-rejoindre-form/nous-rejoindre-form.component";
import {
  NousRejoindreFormAdhesionComponent
} from "./containers/nous-rejoindre-form-adhesion/nous-rejoindre-form-adhesion.component";
import {
  NousRejoindreFormCounselComponent
} from "./containers/nous-rejoindre-form-counsel/nous-rejoindre-form-counsel.component";
import {MatIconModule} from "@angular/material/icon";
import {LitopiaCommonModule} from "../common/litopia-common.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {ReglementComponent} from "./containers/reglement/reglement.component";



@NgModule({
  declarations: [
    NousRejoindreComponent,
    NousRejoindreFormComponent,
    NousRejoindreFormAdhesionComponent,
    NousRejoindreFormCounselComponent,
    ReglementComponent,
  ],
  imports: [
    CommonModule,
    LitopiaCommonModule,
    NousRejoindreRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    TextFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ]
})
export class NousRejoindreModule { }
