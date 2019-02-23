export class Checkbox {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
    this.type = 'Checkbox';
    this.value = value || 'Item 1';
  }

  toSourceCode() {
    return `\
      <ion-item>
        <ion-label>${this.value}</ion-label>
        <ion-checkbox color="dark" checked="false"></ion-checkbox>
      </ion-item>
    \ `;
  }
}
