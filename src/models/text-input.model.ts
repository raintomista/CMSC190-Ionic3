export class TextInput {
  type: string;
  value: string;

  constructor(value?) {
    this.type = 'TextInput';
    this.value = value || 'username@example.com';
  }

  toSourceCode() {
    return ` \
      <ion-item>
        <ion-input type="text" value="${this.value}"></ion-input>
      </ion-item>
    \ `
  }
}
