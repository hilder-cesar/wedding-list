import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router, Scroll } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { fromEvent, merge } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements AfterViewInit {

  @ViewChild('navButtonToggle', { static: true })
  navButtonToggle!: ElementRef;
  
  headerClass = 'color-black';
  navVisible = false;

  faBars = faBars;

  constructor(
    private router: Router,
    viewportScroller: ViewportScroller
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof Scroll))
      .subscribe((event: any) => {
        if (event.routerEvent instanceof NavigationEnd) {
          this.navVisible = false;
        }
        if (event.position) {
          viewportScroller.scrollToPosition(event.position);
        } else if (event.anchor) {
          viewportScroller.scrollToAnchor(event.anchor);
        } else {
          viewportScroller.scrollToPosition([0, 0]);
        }
      });
  }

  ngAfterViewInit(): void {
    const $windowResize = fromEvent(window, 'resize');
    const $windowScroll = fromEvent(window, 'scroll');
    const $navToggleClick = fromEvent(this.navButtonToggle.nativeElement, 'click');
    merge($windowResize, $windowScroll, $navToggleClick)
      .subscribe(() => {
        if (window.innerWidth > 1200) {
          this.headerClass = window.scrollY > 0 ? 'header-background-color' : 'color-black';
        } else {
          this.headerClass = this.navVisible || window.scrollY > 0 ? 'header-background-color' : 'color-black';
        }
      });
  }

  toggleNav(): void {
    this.navVisible = !this.navVisible;
  }

}
