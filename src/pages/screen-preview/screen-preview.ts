import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-screen-preview',
  templateUrl: 'screen-preview.html',
})
export class ScreenPreviewPage {
  screenName: string;
  screenPreview: string = 'https://www.digitaltrends.com/wp-content/uploads/2012/09/iphone-5-ios-6-home.jpeg';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.screenName = this.navParams.data;
  }

  computeMultiplier(aspectRatio) {
    const ratio = aspectRatio.split(':');
    return parseInt(ratio[0]) / parseInt(ratio[1]);
  }
}
