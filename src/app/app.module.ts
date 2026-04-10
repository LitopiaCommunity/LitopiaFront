import {
  APP_ID,
  APP_INITIALIZER,
  Inject,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeChooserComponent } from './layout/navbar/theme-chooser/theme-chooser.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FullscreenImgTextComponent } from './pages/acceuil/fullscreen-img-text/fullscreen-img-text.component';
import { SeasonPresentationsComponent } from './pages/acceuil/season-presentations/season-presentations.component';
import { PictureContentDeliveryComponent } from './utils/picture-content-delivery/picture-content-delivery.component';
import { TimelineComponent } from './pages/acceuil/timeline/timeline.component';
import { TimelineItemComponent } from './pages/acceuil/timeline/timeline-item/timeline-item.component';
import { FooterComponent } from './layout/footer/footer.component';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AProposComponent } from './pages/acceuil/a-propos/a-propos.component';
import { isPlatformServer } from '@angular/common';
import { AppearDirective } from './utils/appear.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Configuration } from './apis/litopia-api/configuration';
import { AuthPopupComponent } from './auth/auth-popup/auth-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RuntimeConfigService } from './runtime-config.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ThemeChooserComponent,
    AcceuilComponent,
    NotFoundComponent,
    FullscreenImgTextComponent,
    SeasonPresentationsComponent,
    TimelineComponent,
    TimelineItemComponent,
    AProposComponent,
    AuthPopupComponent,
  ],
  bootstrap: [AppComponent],
  exports: [MatCheckboxModule],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FooterComponent,
    PictureContentDeliveryComponent,
    AppearDirective,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [
    { provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
    { provide: 'PREFERSCOLOR', useFactory: getPrefersColorSchemeDark },
    { provide: 'WINDOWS', useFactory: getWindows },
    { provide: 'DOCUMENT', useFactory: getDocument },
    { provide: APP_ID, useValue: 'serverApp' },
    {
      provide: APP_INITIALIZER,
      useFactory: initRuntimeConfig,
      deps: [RuntimeConfigService],
      multi: true,
    },
    {
      provide: Configuration,
      useFactory: (runtimeConfig: RuntimeConfigService) =>
        new Configuration({
          basePath: runtimeConfig.apiBasePath,
        }),
      deps: [RuntimeConfigService],
      multi: false,
    },
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
  ],
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: string,
  ) {
    const githubLogoUrl = 'assets/svg/github-logo.svg';
    const discordLogoUrl = 'assets/svg/discord-logo.svg';
    const warningUrl = 'assets/svg/warning.svg';
    if (isPlatformServer(this.platformId)) {
      /* Register empty icons for server-side-rendering to prevent errors */
      this.matIconRegistry.addSvgIconLiteral(
        'github',
        this.domSanitizer.bypassSecurityTrustHtml('<svg></svg>'),
      );
      this.matIconRegistry.addSvgIconLiteral(
        'discord',
        this.domSanitizer.bypassSecurityTrustHtml('<svg></svg>'),
      );
      this.matIconRegistry.addSvgIconLiteral(
        'warning',
        this.domSanitizer.bypassSecurityTrustHtml('<svg></svg>'),
      );
    } else {
      this.matIconRegistry.addSvgIcon(
        'github',
        this.domSanitizer.bypassSecurityTrustResourceUrl(githubLogoUrl),
      );
      this.matIconRegistry.addSvgIcon(
        'discord',
        this.domSanitizer.bypassSecurityTrustResourceUrl(discordLogoUrl),
      );
      this.matIconRegistry.addSvgIcon(
        'warning',
        this.domSanitizer.bypassSecurityTrustResourceUrl(warningUrl),
      );
    }
  }
}

export function getLocalStorage() {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

export function getPrefersColorSchemeDark() {
  return typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;
}

export function getWindows() {
  return typeof window !== 'undefined' ? window : null;
}

export function getDocument() {
  return typeof document !== 'undefined' ? document : null;
}

export function initRuntimeConfig(runtimeConfig: RuntimeConfigService) {
  return () => runtimeConfig.load();
}
