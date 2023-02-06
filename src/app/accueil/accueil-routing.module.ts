import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccueilContainer} from "./containers/acceuil/accueil-container.component";


const routes : Routes = [
  {
    path: '',
    component: AccueilContainer,
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccueilRoutingModule { }
