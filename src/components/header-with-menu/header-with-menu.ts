import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-with-menu',
  templateUrl: 'header-with-menu.html'
})
export class HeaderWithMenuComponent {
  @Input('order')
  order: Number;

  @Input('title')
  title: string;

  constructor() {
    this.title = '';

  }
}
