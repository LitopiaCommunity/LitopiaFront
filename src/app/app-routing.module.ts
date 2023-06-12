import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./pages/not-found/not-found.component";

const routes: Routes = [
  {title:'Litopia - Accueil', path:'', loadChildren:()=>import("./accueil/accueil.module").then(m=>m.AccueilModule), data: { animation: 'acceuil' }},
  {title:'Litopia - Nous Rejoindre', path:'nous-rejoindre', loadChildren:()=>import("./nous-rejoindre/nous-rejoindre.module").then(m=>m.NousRejoindreModule), data: { animation: 'nous-rejoindre' }},
  {title:'Litopia - Membres', path:'membres', loadChildren:()=>import("./membres/membres.module").then(m=>m.MembresModule), data: { animation: 'membres' }},
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
