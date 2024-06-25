import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AcceuilComponent} from "./pages/acceuil/acceuil.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";

import {NousRejoindreComponent} from "./pages/nous-rejoindre/nous-rejoindre.component";
import {NousRejoindreFormAdhesionComponent} from "./pages/nous-rejoindre-form/nous-rejoindre-form-adhesion/nous-rejoindre-form-adhesion.component";
import {NousRejoindreFormCounselComponent} from "./pages/nous-rejoindre-form/nous-rejoindre-form-counsel/nous-rejoindre-form-counsel.component";
import {NousRejoindreFormComponent} from "./pages/nous-rejoindre-form/nous-rejoindre-form/nous-rejoindre-form.component";
import {ReglementComponent} from "./pages/reglement/reglement.component";
import {MembresComponent} from "./pages/membres/membres.component";
import {ProfilComponent} from "./pages/profil/profil.component";

const routes: Routes = [
  {title:'Litopia - Acceuil', path:'', component:AcceuilComponent, data: { animation: 'acceuil' }},
  {title:'Litopia - Nous Rejoindre', path:'nous-rejoindre', component:NousRejoindreComponent, data: { animation: 'nous-rejoindre' }},
  {title:'Litopia - Nous Rejoindre', path:'nous-rejoindre/1', component:NousRejoindreFormAdhesionComponent, data: { animation: 'nous-rejoindre-1' }},
  {title:'Litopia - Nous Rejoindre', path:'nous-rejoindre/2', component:NousRejoindreFormCounselComponent, data: { animation: 'nous-rejoindre-2' }},
  {title:'Litopia - Nous Rejoindre', path:'nous-rejoindre/3', component:NousRejoindreFormComponent, data: { animation: 'nous-rejoindre-3' }},
  {title:'Litopia - Réglement', path:'reglement', component:ReglementComponent, data: { animation: 'reglement' }},
  {title:'Litopia - Membres', path:'membres', component:MembresComponent, data: { animation: 'membres' }},
  {title:'Litopia - Membres', path:'membres/profil/:id', component:ProfilComponent, data: { animation: 'profil' }},
  { path: '**', component:NotFoundComponent, data: { animation: '404' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
