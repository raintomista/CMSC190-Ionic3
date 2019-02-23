import { Component, Input } from '@angular/core';

@Component({
  selector: 'floating-action-button',
  templateUrl: 'floating-action-button.html'
})
export class FloatingActionButtonComponent {
  selected: Boolean = false;

  @Input('icon')
  icon: string;

  @Input('mode')
  mode: string;

  @Input('action')
  action: Function;

  constructor() {
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
