import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NousRejoindreComponent} from "./containers/nous-rejoindre/nous-rejoindre.component";
import {
  NousRejoindreFormAdhesionComponent
} from "./containers/nous-rejoindre-form-adhesion/nous-rejoindre-form-adhesion.component";
import {
  NousRejoindreFormCounselComponent
} from "./containers/nous-rejoindre-form-counsel/nous-rejoindre-form-counsel.component";
import {NousRejoindreFormComponent} from "./containers/nous-rejoindre-form/nous-rejoindre-form.component";
import {ReglementComponent} from "./containers/reglement/reglement.component";



const routes : Routes = [
  { path:'', component:NousRejoindreComponent, data: { animation: 'nous-rejoindre' }},
  { path:'1', component:NousRejoindreFormAdhesionComponent, data: { animation: 'nous-rejoindre-1' }},
  { path:'2', component:NousRejoindreFormCounselComponent, data: { animation: 'nous-rejoindre-2' }},
  { path:'3', component:NousRejoindreFormComponent, data: { animation: 'nous-rejoindre-3' }},
  {title:'Litopia - Réglement', path:'reglement', component:ReglementComponent, data: { animation: 'reglement' }},
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NousRejoindreRoutingModule { }
