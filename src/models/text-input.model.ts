export class TextInput {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
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
