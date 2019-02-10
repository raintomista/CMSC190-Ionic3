import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-inspector',
  templateUrl: 'inspector.html',
})
export class InspectorPage {
  componentType: string;
  componentStyleKeys: any;
  componentStyles: any;
  // componentStyleKeys: any[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController) {
      this.componentType = this.navParams.get('componentType');
      this.componentStyleKeys = Object.keys(this.navParams.get('componentStyles'));
      this.componentStyles = this.navParams.get('componentStyles');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
