export class ListItem {
  type: string;
  value: string;

  constructor(value?) {
    this.type = 'ListItem';
    this.value = value || 'List Item';
  }

  toSourceCode() {
    return `\
      <ion-item>${this.value}</ion-item>
    \ `;
  }
}
