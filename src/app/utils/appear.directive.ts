import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appear]',
  standalone: true,
})
export class AppearDirective implements AfterViewInit {
  private hasAppeared = false;

  @Output()
  appear: EventEmitter<boolean>;

  constructor(
    private element: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject('WINDOWS') private window: Window,
  ) {
    this.appear = new EventEmitter<boolean>();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.window.requestAnimationFrame(() => this.checkVisible());
  }

  checkVisible() {
    if (this.hasAppeared || !isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.hasReachedViewport()) {
      this.hasAppeared = true;
      this.appear.emit(true);
      this.appear.complete();
    }
  }

  eventHandler() {
    this.checkVisible();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.checkVisible();
  }

  @HostListener('window:load', [])
  onLoad() {
    this.eventHandler();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.eventHandler();
  }

  hasReachedViewport() {
    const rect = this.element.nativeElement.getBoundingClientRect();

    // If the element is already visible, or the user has already scrolled past
    // its top edge before hydration completes, consider it revealed.
    return rect.top <= this.window.innerHeight;
  }
}
