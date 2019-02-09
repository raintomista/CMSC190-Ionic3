export class FAB {
  type: string;
  value: string;

  constructor(value?) {
    this.type = 'FAB';
    this.value = value || 'add';
  }

  toSourceCode() {
    return `\
      <ion-fab right bottom>
        <button ion-fab color="light">
          <ion-icon name="${this.value}"></ion-icon>
        </button>
      </ion-fab>
    \ `;
  }
}
