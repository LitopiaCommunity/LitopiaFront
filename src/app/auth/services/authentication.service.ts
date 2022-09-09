import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {User} from "./auth-user";
import {isPlatformBrowser} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {AuthPopupComponent} from "../auth-popup/auth-popup.component";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  private currentUserSubject: BehaviorSubject<Partial<User>>;
  public currentUserObs: Observable<Partial<User>>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('WINDOWS') private windows:Window,
    private readonly http: HttpClient,
    private readonly dialog: MatDialog) {
    this.currentUserSubject = new BehaviorSubject<Partial<User>>({logged:false});
    this.currentUserObs = this.currentUserSubject.asObservable();
    this.updateUserStatus();
  }

  public get currentUserValue(): Partial<User>{
    return this.currentUserSubject.value;
  }

  public async login() {
    if (isPlatformBrowser(this.platformId)) {
      const continueLogin = await this.infoLoginPopup()
      if (!continueLogin) return;
      const child = this.popupCenter('/api/auth/login',1000,700)
      const timer = setInterval(() => {
        if (child && child.closed) {
          this.updateUserStatus();
          clearInterval(timer);
        }
      }, 500);
    }
  }

  private async infoLoginPopup() {
    const displayPopupJson = this.windows.localStorage.getItem('display-login-popup')
    const displayPopup = typeof displayPopupJson === "undefined" || displayPopupJson === null ? true : JSON.parse(displayPopupJson)
    let openLoginBox = true;
    if (displayPopup) {
      const ref = this.dialog.open(AuthPopupComponent, {data: {canLogin: false}})
      openLoginBox = await firstValueFrom(ref.afterClosed())
    }
    return openLoginBox;
  }

  public async logout(){
    try {
      await firstValueFrom(this.http.get('/api/auth/logout'))
    } catch (e){}
    this.updateUserStatus();
  }

  public updateUserStatus(){
    this.http.get<User>('/api/auth/status').subscribe({
      next:(value)=>{
        this.currentUserSubject.next({
          ...value,
          logged:true
        })
      },
      error:()=>{
        this.currentUserSubject.next({logged:false})
      },
    })
  }

  popupCenter(url:string, w:number, h:number){
    const y = window.top!.outerHeight / 2 + window.top!.screenY - ( h / 2);
    const x = window.top!.outerWidth / 2 + window.top!.screenX - ( w / 2);
    return window.open(url, '', `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
  }
}
