import { Component, Input } from '@angular/core';

@Component({
  selector: 'image',
  templateUrl: 'image.html'
})
export class ImageComponent {
  @Input('src')
  src: string;

  @Input('mode')
  mode: string;

  @Input('action')
  action: Function;

  constructor() {
  }

  performAction(event) {
    switch (this.mode) {
      case 'preview':
        break;
      case 'build':
        this.action();
        break;
      case 'inspect':
        this.action(event);
        break;
    }
  }
}
