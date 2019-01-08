import { ScreenInspectPage } from './../screen-inspect/screen-inspect';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenPreviewPage } from './../screen-preview/screen-preview';
import { ScreenBuildPage } from './../screen-build/screen-build';

@IonicPage()
@Component({
  selector: 'page-screen-tabs',
  templateUrl: 'screen-tabs.html',
})
export class ScreenTabsPage {
  tab1:any = ScreenPreviewPage;
  tab2:any = ScreenBuildPage;
  tab3:any = ScreenInspectPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
}
