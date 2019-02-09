import { Component, Input } from '@angular/core';

@Component({
  selector: 'radio',
  templateUrl: 'radio.html'
})
export class RadioComponent {
  selected: Boolean = false;

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
