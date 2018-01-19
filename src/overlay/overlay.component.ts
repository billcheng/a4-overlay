import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'a4-overlay',
  template: ``,
  styles: [`
  :host {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.1);
    z-index: 999;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {

}