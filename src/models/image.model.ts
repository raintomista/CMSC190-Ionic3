export class Image {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
    this.type = 'Image';
    this.value = value || 'https://pbs.twimg.com/media/DwgvSPvU8AAEkjd.jpg';
  }

  toSourceCode() {
    return `<img src="${this.value}" alt="" />\n`
  }
}
