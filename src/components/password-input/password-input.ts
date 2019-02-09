import { Component, Input } from '@angular/core';

@Component({
  selector: 'password-input',
  templateUrl: 'password-input.html'
})
export class PasswordInputComponent {
  selected: Boolean = false;

  @Input('value')
  value: string;

  @Input('mode')
  mode: string;

  @Input('action')
  action: Function;

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
