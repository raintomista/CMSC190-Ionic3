import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-review-components',
  templateUrl: 'review-components.html',
})
export class ReviewComponentsPage {
  reorder_mode = true;
  original_file = 'http://192.168.254.112:8000/uploads/image5.jpg';
  labelled_file = 'http://192.168.254.112:8000/uploads/image5-labelled.jpg';
  processing_time = 8.24523673554681;
  detected_components = [
    {
      name: "person",
      offset_x1: 277,
      offset_x2: 401,
      offset_y1: 181,
      offset_y2: 307,
      percentage_probability: 36.88950538635254
    },
    {
      name: "person",
      offset_x1: 144,
      offset_x2: 290,
      offset_y1: 114,
      offset_y2: 296,
      percentage_probability: 43.86231601238251
    },
    {
      name: "person",
      offset_x1: 439,
      offset_x2: 575,
      offset_y1: 137,
      offset_y2: 281,
      percentage_probability: 62.9062294960022
    }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
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
}
