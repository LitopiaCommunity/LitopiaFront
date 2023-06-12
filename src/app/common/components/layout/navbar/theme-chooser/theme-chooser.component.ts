import { Component } from '@angular/core';
import {ThemesChooserService} from "../../../../services/themes-chooser/themes-chooser.service";

@Component({
  selector: 'app-theme-chooser',
  templateUrl: './theme-chooser.component.html',
  styleUrls: ['./theme-chooser.component.scss']
})
export class ThemeChooserComponent {

  constructor(private themeChooser:ThemesChooserService) {
  }

  setSystemMode() {
    this.themeChooser.setSystemMode()
  }

  setDarkMode() {
    this.themeChooser.updateSettings("dark",true)
  }

  setLightMode() {
    this.themeChooser.updateSettings("light",true)
  }
}
