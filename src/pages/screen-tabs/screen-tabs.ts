import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenPreviewPage } from './../screen-preview/screen-preview';

@IonicPage()
@Component({
  selector: 'page-screen-tabs',
  templateUrl: 'screen-tabs.html',
})
export class ScreenTabsPage {
  tab1 = ScreenPreviewPage;
  tab2 = ScreenPreviewPage;
  tab3 = ScreenPreviewPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
