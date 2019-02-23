export class Button {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
    this.type = 'Button';
    this.value = value || 'Button Text';
  }

  toSourceCode() {
    return `\
      <button ion-button>${this.value}</button>
    \ `;
  }
}
