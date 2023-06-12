import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MembersContainer} from "./containers/membres/members-container.component";


const routes: Routes =[{
  path: '',
  component: MembersContainer,
}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembresRoutingModule { }
