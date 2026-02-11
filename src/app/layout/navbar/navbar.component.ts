import {Component} from '@angular/core';
import {ThemesChooserService} from "../../utils/themes-chooser.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../auth/services/authentication.service";
import {Observable} from "rxjs";
import {User} from "../../auth/services/auth-user";
import {RuntimeConfigService} from "../../runtime-config.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss','navbar.desktop.component.scss','navbar.mobile.component.scss','navbar.theme.component.scss'],
})
export class NavbarComponent {
  constructor(
    private themesChooser:ThemesChooserService,
    private router: Router,
    private authenticationService:AuthenticationService,
    private runtimeConfig: RuntimeConfigService
  ) { }

  get accent(){
    return this.themesChooser.accent
  }

  checkUrl(s: string) {
    return this.router.url === s
  }

  login(){
    this.authenticationService.login()
  }

  authObs():Observable<Partial<User>>{
    return this.authenticationService.currentUserObs
  }

  logout() {
    this.authenticationService.logout()
  }

  get blueMapUrl() {
    return this.runtimeConfig.blueMapUrl
  }
}
