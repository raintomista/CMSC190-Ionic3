import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Events, IonicPage, ModalController, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ScreenPreviewPage } from './../screen-preview/screen-preview';
import { ScreenBuildPage } from './../screen-build/screen-build';
import { ScreenInspectPage } from './../screen-inspect/screen-inspect';
import { SharedTabProvider } from '../../providers/shared-tab/shared-tab';
import { InspectorPage } from '../inspector/inspector';
import { EditComponentPage } from '../edit-component/edit-component';
import { ReplaceComponentPage } from '../replace-component/replace-component';
import { Socket } from 'ng-socket-io';

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
    private events: Events,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private sharedProvider: SharedTabProvider,
    private socket: Socket) {
      this.aspectRatio = this.navParams.get('aspectRatio');
      this.projectId = this.navParams.get('projectId');
      this.projectName = this.navParams.get('projectName');
      this.screenId = this.navParams.get('screenId');
      this.screenName = this.navParams.get('screenName')

      this.sharedProvider.setParams(this.navParams)
      this.sharedProvider.getScreen(this.navParams.data.screenId);

      this.listenChanges().subscribe((screenId) => {
        if(this.screenId === screenId) {
          this.sharedProvider.getScreen(screenId);
        }
      });
  }
  ionViewWillLeave() {
    this.sharedProvider.saveScreenshot();
  }

  listenChanges() {
    let observable = new Observable(observer => {
      this.socket.on('component_changes', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }


  performAction(componentId, componentType, targetElement) {
    switch (this.mode) {
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
            let modal = this.modalCtrl.create(ReplaceComponentPage, {
              componentId: componentId,
              componentType: componentType,
              screenName: this.screenName
            });
            modal.present();
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
