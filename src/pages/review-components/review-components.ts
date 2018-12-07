import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-review-components',
  templateUrl: 'review-components.html',
})
export class ReviewComponentsPage {
  reorder_mode:boolean = true;
  original_file: string;
  labelled_file: string;
  processing_time:number;
  detected_components:any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
      this.original_file = this.navParams.get('original_file');
      this.labelled_file = this.navParams.get('labelled_file');
      this.detected_components = this.navParams.get('detected_components');
      this.processing_time = this.navParams.get('processing_time');
  }

  getComponentPreview(component) {
    const offset_x1 = component.offset_x1;
    const offset_y1 = component.offset_y1;
    const offset_x2 = component.offset_x2;
    const offset_y2 = component.offset_y2;

    return this.original_file +
           '?offset_x1=' + offset_x1 +
           '&offset_y1=' + offset_y1 +
           '&offset_x2=' + offset_x2 +
           '&offset_y2=' + offset_y2;
  }

  close() {
    this.navCtrl.pop();
  }

  proceed() {
    // this.navCtrl.push()
  }
}
