export class Button {
  type: string;
  value: string;

  constructor(value?) {
    this.type = 'Button';
    this.value = value || 'Button Text';
  }

  toSourceCode() {
    return `\
      <button ion-button>${this.value}</button>
    \ `;
  }
}
