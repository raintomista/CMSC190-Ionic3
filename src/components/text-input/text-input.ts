import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-input',
  templateUrl: 'text-input.html'
})
export class TextInputComponent {
  selected: Boolean = false;

  @Input('disabled')
  disabled: string;

  @Input('text')
  text: string;

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
