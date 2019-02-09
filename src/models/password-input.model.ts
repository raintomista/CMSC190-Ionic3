export class PasswordInput {
  type: string;
  value: string;

  constructor(value?) {
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
