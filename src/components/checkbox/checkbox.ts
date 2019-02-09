import { Component, Input } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.html'
})
export class CheckboxComponent {
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
