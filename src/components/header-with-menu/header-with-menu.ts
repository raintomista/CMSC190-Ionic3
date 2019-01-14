import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-with-menu',
  templateUrl: 'header-with-menu.html'
})
export class HeaderWithMenuComponent {
  selected: Boolean = false;

  @Input('action')
  action: Function;

  @Input('mode')
  mode: string;

  @Input('order')
  order: Number;

  @Input('title')
  title: string;

  constructor() {
    this.title = '';
  }

  tap() {
    switch (this.mode) {
      case 'preview':
        break;
    }
  }

  press(event) {
    switch (this.mode) {
      case 'build':
        this.selected = true;
        this.action();
        break;
      case 'inspect':
        this.selected = true;
        this.action(event.target)
        break;
    }
  }

  onPressEnd() {
    this.selected = false;
  }
}
