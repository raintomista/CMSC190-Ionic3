import { Component, Input } from '@angular/core';

@Component({
  selector: 'image',
  templateUrl: 'image.html'
})
export class ImageComponent {
  @Input('src')
  src: string;

  constructor() {
  }
}
