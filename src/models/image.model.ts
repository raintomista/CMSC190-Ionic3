export class Image {
  target_screen: string;
  type: string;
  value: string;

  constructor(value?) {
    this.target_screen = null;
    this.type = 'Image';
    this.value = value || 'https://s3-ap-southeast-1.amazonaws.com/drawtotype/uploads/default-image.png';
  }

  toSourceCode() {
    return `<img src="${this.value}" alt="" />\n`
  }
}
