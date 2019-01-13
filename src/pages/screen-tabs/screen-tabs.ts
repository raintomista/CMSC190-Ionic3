import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ScreenPreviewPage } from './../screen-preview/screen-preview';
import { ScreenBuildPage } from './../screen-build/screen-build';
import { ScreenInspectPage } from './../screen-inspect/screen-inspect';
import { SharedTabProvider } from '../../providers/shared-tab/shared-tab';
import { InspectorPage } from '../inspector/inspector';
import { EditComponentPage } from '../edit-component/edit-component';

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
    private actionSheetCtrl: ActionSheetController,
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

  performAction(componentId, componentType, targetElement) {
    switch(this.mode) {
      case 'build':
        this.presentBuildActions(componentId, componentType);
        break;
      case 'inspect':
        this.presentInspector(componentType, targetElement);
        break;
    }
  }

  presentBuildActions(componentId, componentType) {
    let actionSheet = this.actionSheetCtrl.create({
      title: componentType,
      buttons: [
        {
          text: 'Edit Component',
          handler: () => {
            let modal = this.modalCtrl.create(EditComponentPage, {
              componentId,
              componentType
            })
            modal.present();
          }
        },
        {
          text: 'Replace Component',
          handler: () => {

          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
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
