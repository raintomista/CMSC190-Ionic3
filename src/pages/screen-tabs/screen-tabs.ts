import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { ScreenPreviewPage } from './../screen-preview/screen-preview';
import { ScreenBuildPage } from './../screen-build/screen-build';
import { ScreenInspectPage } from './../screen-inspect/screen-inspect';
import { SharedTabProvider } from '../../providers/shared-tab/shared-tab';
import { InspectorPage } from '../inspector/inspector';

@IonicPage()
@Component({
  selector: 'page-screen-tabs',
  templateUrl: 'screen-tabs.html',
  providers: [SharedTabProvider]
})
export class ScreenTabsPage {
  aspectRatio: string;
  mode: string = 'preview';
  projectId: string;
  projectName: string;
  screenId: string;
  screenName: string;
  components: any = [];

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private sharedProvider: SharedTabProvider) {
      this.aspectRatio = this.navParams.get('aspectRatio');
      this.projectId = this.navParams.get('projectId');
      this.projectName = this.navParams.get('projectName');
      this.screenId = this.navParams.get('screenId');
      this.screenName = this.navParams.get('screenName')
  }

  ionViewDidEnter() {
    this.sharedProvider.setParams(this.navParams)
    this.sharedProvider.getScreen(this.navParams.data.screenId);
  }

  performAction(componentType, targetElement) {
    switch(this.mode) {
      case 'inspect':
        this.presentInspector(componentType, targetElement);
        break;
    }
  }

  presentInspector(componentType, targetElement) {
    const componentStyles = getComputedStyle(targetElement);
    let modal = this.modalCtrl.create(InspectorPage, { componentType, componentStyles });
    modal.present();
  }

  selectMode(mode) {
    this.mode = mode;
  }
}
