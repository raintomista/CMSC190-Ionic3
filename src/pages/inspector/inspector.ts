import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-inspector',
  templateUrl: 'inspector.html',
})
export class InspectorPage {
  componentType: string;
  componentStyles: any;
  // componentStyleKeys: any[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController) {
      this.componentType = this.navParams.get('componentType');
      this.componentStyles = this.navParams.get('componentStyles');
      // this.componentStyleKeys = ['background-color', 'border', 'height', 'margin', 'padding', 'width']
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
