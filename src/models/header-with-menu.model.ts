export class HeaderWithMenu {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
    this.type = 'HeaderWithMenu';
    this.value = value || 'Title';
  }

  toSourceCode() {
    return `\
      <ion-header>
        <ion-toolbar>
          <button ion-button menuToggle icon-only>
            <ion-icon name='menu'></ion-icon>
          </button>
          <ion-title>
            ${this.value}
          </ion-title>
        </ion-toolbar>
      </ion-header>
    \ `;
  }
}
