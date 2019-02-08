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
        <ion-label floating>{{label}}</ion-label>
        <ion-input type="text"></ion-input>
      </ion-item>
    \ `
  }
}
