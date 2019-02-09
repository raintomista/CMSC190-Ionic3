export class Radio {
  type: string;
  value: string;

  constructor(value?) {
    this.type = 'Radio';
    this.value = value || 'Item 1';
  }

  toSourceCode() {
    return `\
      <ion-item>
        <ion-label>${this.value}</ion-label>
        <ion-radio value="${this.value}"></ion-radio>
      </ion-item>
    \ `;
  }
}
