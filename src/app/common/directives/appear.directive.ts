import {Directive, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Directive({
  selector: '[appear]'
})
export class AppearDirective implements OnInit{

  windowHeight: number = 0;
  elementHeight: number = 0;
  elementPos: number = 0;
  isInit=false;

  @Output()
  appear: EventEmitter<boolean>;

  constructor(
    private element: ElementRef,
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject('WINDOWS') private window:Window,
    @Inject('DOCUMENT') private document:Document,
  ) {
    this.appear = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
      this.elementHeight = (this.element.nativeElement as HTMLElement).offsetHeight;
      this.elementPos = (this.element.nativeElement as HTMLElement).offsetTop;
      this.isInit=true;
    }

  checkVisible() {
    if(isPlatformBrowser(this.platformId)&&this.isInit) {
      if(this.isInViewport()) {
        this.appear.emit(true);
        this.appear.complete();
      }
    }
  }

  eventHandler(){
    if(isPlatformBrowser(this.platformId)) {
      this.windowHeight = (this.window.innerHeight);
      this.checkVisible();
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.checkVisible();
  }

  @HostListener('window:load', [])
  onLoad() {
    //this.eventHandler()
  }

  @HostListener('window:resize', [])
  onResize() {
    this.eventHandler()
  }

  isInViewport() {
    const rect = this.element.nativeElement.getBoundingClientRect();
    const topShown = rect.top >= 0;
    const bottomShown = rect.bottom <= window.innerHeight+rect.height;
    return topShown && bottomShown;
  }
}
