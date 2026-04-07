import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    title: "Litopia - L'Ultime Saison (2016-2026)",
    path: '',
    component: AcceuilComponent,
    data: { animation: 'acceuil' },
  },
  {
    title: 'Litopia - Archives & Téléchargements',
    path: 'archives',
    loadComponent: () =>
      import('./pages/archives/archives.component').then(
        (m) => m.ArchivesComponent,
      ),
    data: { animation: 'archives' },
  },
  {
    title: 'Litopia - Archives',
    path: 'nous-rejoindre',
    redirectTo: 'archives',
    pathMatch: 'full',
  },
  {
    title: 'Litopia - Archives',
    path: 'nous-rejoindre/1',
    redirectTo: 'archives',
    pathMatch: 'full',
  },
  {
    title: 'Litopia - Archives',
    path: 'nous-rejoindre/2',
    redirectTo: 'archives',
    pathMatch: 'full',
  },
  {
    title: 'Litopia - Archives',
    path: 'nous-rejoindre/3',
    redirectTo: 'archives',
    pathMatch: 'full',
  },
  {
    title: 'Litopia - Réglement',
    path: 'reglement',
    loadComponent: () =>
      import('./pages/reglement/reglement.component').then(
        (m) => m.ReglementComponent,
      ),
    data: { animation: 'reglement' },
  },
  {
    title: 'Litopia - Membres',
    path: 'membres',
    loadComponent: () =>
      import('./pages/membres/membres.component').then(
        (m) => m.MembresComponent,
      ),
    data: { animation: 'membres' },
  },
  {
    title: 'Litopia - Membres',
    path: 'membres/profile/:id',
    loadComponent: () =>
      import('./pages/profil/profil.component').then((m) => m.ProfilComponent),
    data: { animation: 'profil' },
  },
  { path: '**', component: NotFoundComponent, data: { animation: '404' } },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
