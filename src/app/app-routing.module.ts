import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./pages/not-found/not-found.component";

import {ReglementComponent} from "./pages/reglement/reglement.component";
import {MembresComponent} from "./pages/membres/membres.component";

const routes: Routes = [
  {title:'Litopia - Accueil', path:'', loadChildren:()=>import("./accueil/accueil.module").then(m=>m.AccueilModule), data: { animation: 'acceuil' }},
  {title:'Litopia - Nous Rejoindre', path:'nous-rejoindre', loadChildren:()=>import("./nous-rejoindre/nous-rejoindre.module").then(m=>m.NousRejoindreModule), data: { animation: 'nous-rejoindre' }},
  {title:'Litopia - Réglement', path:'reglement', component:ReglementComponent, data: { animation: 'reglement' }},
  {title:'Litopia - Membres', path:'membres', component:MembresComponent, data: { animation: 'membres' }},
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
