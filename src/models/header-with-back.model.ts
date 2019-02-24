export class HeaderWithBack {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
    this.type = 'HeaderWithBack';
    this.value = value || 'Title';
  }

  toSourceCode() {
    return `\
      <ion-header>
        <ion-navbar>
          <ion-title>
            ${this.value}
          </ion-title>
        </ion-navbar>
      </ion-header>
    \ `;
  }
}
