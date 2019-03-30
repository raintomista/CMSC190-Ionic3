export class Radio {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
    this.type = 'Radio';
    this.value = value || 'Item 1';
  }

  toSourceCode() {
    return `\
      <ion-item>
        <ion-label>${this.value}</ion-label>
        <ion-radio color="dark" value="${this.value}"></ion-radio>
      </ion-item>
    \ `;
  }
}
