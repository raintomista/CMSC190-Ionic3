export class ListItem {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
    this.type = 'ListItem';
    this.value = value || 'List Item';
  }

  toSourceCode() {
    return `\
      <ion-item>${this.value}</ion-item>
    \ `;
  }
}
