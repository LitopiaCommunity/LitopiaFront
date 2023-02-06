import {Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OverlayContainer} from "@angular/cdk/overlay";
import {DOCUMENT, isPlatformBrowser} from "@angular/common";

type Theme = 'dark'|'light'
interface ThemeSettings{
  theme:Theme,
  overrideSystemTheme:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ThemesChooserService {
  settings:BehaviorSubject<ThemeSettings>
  private renderer:Renderer2;

  constructor(private overlay: OverlayContainer,
              @Inject(PLATFORM_ID) private platformId: any,
              @Inject('LOCALSTORAGE') private localStorage: any,
              @Inject('PREFERSCOLOR') private prefersColorSchemeDark:  MediaQueryList,
              @Inject(DOCUMENT) private document: Document,
              rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.settings = new BehaviorSubject<ThemeSettings>(this.retrieveSettings())
    if (isPlatformBrowser(this.platformId)) {
      if (!this.settings.value.overrideSystemTheme) this.setSystemMode();

      this.prefersColorSchemeDark.addEventListener('change', event => {
        if (!this.settings.value.overrideSystemTheme) {
          if (event.matches) {
            this.updateSettings("dark")
          } else {
            this.updateSettings("light")
          }
        }
      })

      this.settings.subscribe(val => {
        if (val.theme === 'dark') this.setDark()
        if (val.theme === 'light') this.setLight()
        this.storeSettings(val);
      })
    }
  }

  public updateSettings(theme:'dark'|'light',overrideSystemTheme?:boolean) {
    this.settings.next({
      theme,
      overrideSystemTheme:typeof overrideSystemTheme!=="undefined"?overrideSystemTheme:this.settings.value.overrideSystemTheme
    })
  }

  private setDark(){
    this.renderer.removeClass(this.document.body,'light-theme')
    this.overlay.getContainerElement().classList.remove('light-theme')
  }

  private setLight(){
    this.renderer.addClass(this.document.body,'light-theme')
    this.overlay.getContainerElement().classList.add('light-theme')
  }

  public setSystemMode(){
    if (isPlatformBrowser(this.platformId)) {
      const prefersDarkScheme = this.prefersColorSchemeDark
      let theme: Theme;
      if (prefersDarkScheme.matches) {
        theme = 'dark'
      } else {
        theme = 'light'
      }
      this.settings.next({
        theme,
        overrideSystemTheme: false
      })
    }
  }

  get accent(){
    return this.settings.value.theme=='light'?'accent':'primary';
  }

  private storeSettings(val:ThemeSettings){
    if(isPlatformBrowser(this.platformId)){
      this.localStorage.setItem('theme',JSON.stringify(val))
    }
  }

  private retrieveSettings():ThemeSettings{
    if(isPlatformBrowser(this.platformId)) {
      const item = this.localStorage.getItem('theme')
      if (item !== null) {
        const json = JSON.parse(item)
        if (['light', 'dark'].includes(json.theme) && typeof json.overrideSystemTheme === 'boolean') {
          return json as ThemeSettings;
        }
      }
    }
    // If you can't get config return default one
    return {
      theme:"light",
      overrideSystemTheme: false,
    }
  }
}
