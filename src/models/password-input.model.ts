export class PasswordInput {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
    this.type = 'PasswordInput';
    this.value = value || '********';
  }

  toSourceCode() {
    return ` \
      <ion-item>
        <ion-input type="password" value="${this.value}"></ion-input>
      </ion-item>
    \ `
  }
}
