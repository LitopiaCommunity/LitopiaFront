import {Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconRegistry} from "@angular/material/icon";
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {isPlatformServer} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ApiModule, Configuration} from "./apis/litopia-api";
import {environment} from '../environments/environment';
import {AccueilModule} from "./accueil/accueil.module";
import {LitopiaCommonModule} from "./common/litopia-common.module";
import {NousRejoindreModule} from "./nous-rejoindre/nous-rejoindre.module";
import {MembresModule} from "./membres/membres.module";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AccueilModule,
    NousRejoindreModule,
    LitopiaCommonModule,
    MembresModule,
    ApiModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: 'LOCALSTORAGE', useFactory: getLocalStorage},
    {provide: 'PREFERSCOLOR', useFactory: getPrefersColorSchemeDark},
    {provide: 'WINDOWS', useFactory: getWindows},
    {provide: 'DOCUMENT', useFactory: getDocument},
    {
      provide: Configuration,
      useFactory: () => new Configuration(
        {
          basePath: environment.apiBasePath,
        }
      ),
      multi: false
    }
  ],
  bootstrap: [AppComponent],
  exports: [MatCheckboxModule]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: string) {
    const githubLogoUrl = 'assets/svg/github-logo.svg';
    const discordLogoUrl = 'assets/svg/discord-logo.svg'
    const warningUrl = 'assets/svg/warning.svg'
    if (isPlatformServer(this.platformId)) {
      /* Register empty icons for server-side-rendering to prevent errors */
      this.matIconRegistry.addSvgIconLiteral('github', this.domSanitizer.bypassSecurityTrustHtml('<svg></svg>'));
      this.matIconRegistry.addSvgIconLiteral('discord', this.domSanitizer.bypassSecurityTrustHtml('<svg></svg>'));
      this.matIconRegistry.addSvgIconLiteral('warning', this.domSanitizer.bypassSecurityTrustHtml('<svg></svg>'));
    } else {
      this.matIconRegistry.addSvgIcon('github', this.domSanitizer.bypassSecurityTrustResourceUrl(githubLogoUrl));
      this.matIconRegistry.addSvgIcon('discord', this.domSanitizer.bypassSecurityTrustResourceUrl(discordLogoUrl));
      this.matIconRegistry.addSvgIcon('warning', this.domSanitizer.bypassSecurityTrustResourceUrl(warningUrl));
    }
  }
}


export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}

export function getPrefersColorSchemeDark() {
  return (typeof window !== "undefined") ? window.matchMedia('(prefers-color-scheme: dark)') : null;
}

export function getWindows() {
  return (typeof window !== "undefined") ? window : null;
}

export function getDocument() {
  return (typeof document !== "undefined") ? document : null;
}
