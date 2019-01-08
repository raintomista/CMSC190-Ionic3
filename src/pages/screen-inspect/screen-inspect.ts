import { Component } from '@angular/core';
import { App, ActionSheetController, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { InspectorPage } from '../inspector/inspector';
import { ProjectPage } from '../project/project';
import { ScreenProvider } from '../../providers/screen/screen';

@Component({
  selector: 'page-screen-inspect',
  templateUrl: 'screen-inspect.html',
})
export class ScreenInspectPage {
  aspectRatio: string;
  projectId: string;
  projectName: string;
  screenId: string;
  screenName: string;
  components: any = [];

  constructor(
    private appCtrl: App,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider) {
      this.aspectRatio = this.navParams.data.aspectRatio;
      this.projectId = this.navParams.data.projectId;
      this.projectName = this.navParams.data.projectName;
      this.screenId = this.navParams.data.screenId;
      this.screenName = this.navParams.data.screenName;
      this.getComponents(this.screenId);
  }

  async getComponents(id) {
    try {
      const response = await this.provider.getScreen(id) as any;
      this.components = response.item.components;
    } catch(e) {
      throw new Error(e);
    }
  }

  computeMultiplier(aspectRatio) {
    const ratio = aspectRatio.split(':');
    return parseInt(ratio[1]) / parseInt(ratio[0]);
  }

  presentInspector(componentType, targetElement) {
    const componentStyles = getComputedStyle(targetElement);
    let modal = this.modalCtrl.create(InspectorPage, { componentType, componentStyles });
    modal.present();
  }

  showMore() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Exit Screen',
          role: 'destructive',
          handler: () => {
            this.exit();
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

  exit() {
    this.appCtrl.getRootNavs()[0].setRoot(HomePage, null, { animate: true })
    this.appCtrl.getRootNavs()[0].push(ProjectPage, {
      aspectRatio: this.aspectRatio,
      projectId: this.projectId,
      projectName: this.projectName
    });
  }
}
