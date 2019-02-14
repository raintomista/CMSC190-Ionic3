import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-component',
  templateUrl: 'button.html'
})
export class ButtonComponent {
  selected: Boolean = false;

  @Input('text')
  text: string;

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
