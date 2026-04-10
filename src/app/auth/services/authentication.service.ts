import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { User } from './auth-user';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthPopupComponent } from '../auth-popup/auth-popup.component';

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Partial<User>>;
  public currentUserObs: Observable<Partial<User>>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('WINDOWS') private windows: WindowWithIdleCallback,
    private readonly http: HttpClient,
    private readonly dialog: MatDialog,
  ) {
    this.currentUserSubject = new BehaviorSubject<Partial<User>>({
      logged: false,
    });
    this.currentUserObs = this.currentUserSubject.asObservable();
    if (isPlatformBrowser(this.platformId)) {
      this.scheduleInitialUserStatusUpdate();
    }
  }

  private scheduleInitialUserStatusUpdate() {
    let hasStarted = false;
    const startUpdate = () => {
      if (hasStarted) {
        return;
      }

      hasStarted = true;
      this.deferUserStatusUpdate();
    };

    if (this.windows?.document?.readyState === 'complete') {
      startUpdate();
      return;
    }

    this.windows?.addEventListener?.('load', startUpdate, { once: true });
    this.windows?.setTimeout?.(startUpdate, 1500);
  }

  private deferUserStatusUpdate() {
    if (this.windows?.requestIdleCallback) {
      this.windows.requestIdleCallback(() => this.updateUserStatus(), {
        timeout: 2000,
      });
      return;
    }

    this.windows?.setTimeout(() => this.updateUserStatus(), 250);
  }

  public get currentUserValue(): Partial<User> {
    return this.currentUserSubject.value;
  }

  public async login() {
    if (isPlatformBrowser(this.platformId)) {
      const continueLogin = await this.infoLoginPopup();
      if (!continueLogin) return;
      const child = this.popupCenter('/api/auth/login', 1000, 700);
      const timer = setInterval(() => {
        if (child && child.closed) {
          this.updateUserStatus();
          clearInterval(timer);
        }
      }, 500);
    }
  }

  private async infoLoginPopup() {
    const displayPopupJson = this.windows.localStorage.getItem(
      'display-login-popup',
    );
    const displayPopup =
      typeof displayPopupJson === 'undefined' || displayPopupJson === null
        ? true
        : JSON.parse(displayPopupJson);
    let openLoginBox = true;
    if (displayPopup) {
      const ref = this.dialog.open(AuthPopupComponent, {
        data: { canLogin: false },
      });
      openLoginBox = await firstValueFrom(ref.afterClosed());
    }
    return !!openLoginBox;
  }

  public async logout() {
    try {
      await firstValueFrom(this.http.get('/api/auth/logout'));
    } catch (e) {}
    this.updateUserStatus();
  }

  public updateUserStatus() {
    if (!isPlatformBrowser(this.platformId)) {
      this.currentUserSubject.next({ logged: false });
      return;
    }

    this.http.get<User>('/api/auth/status').subscribe({
      next: (value) => {
        this.currentUserSubject.next({
          ...value,
          logged: true,
        });
      },
      error: () => {
        this.currentUserSubject.next({ logged: false });
      },
    });
  }

  popupCenter(url: string, w: number, h: number) {
    const parentWindow = this.windows?.top ?? this.windows;
    const outerHeight = parentWindow?.outerHeight ?? 0;
    const outerWidth = parentWindow?.outerWidth ?? 0;
    const screenY = parentWindow?.screenY ?? 0;
    const screenX = parentWindow?.screenX ?? 0;
    const y = outerHeight / 2 + screenY - h / 2;
    const x = outerWidth / 2 + screenX - w / 2;
    return (
      this.windows?.open(
        url,
        '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`,
      ) ?? null
    );
  }
}
