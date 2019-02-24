import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-with-back',
  templateUrl: 'header-with-back.html'
})
export class HeaderWithBackComponent {
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
        this.action();
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
