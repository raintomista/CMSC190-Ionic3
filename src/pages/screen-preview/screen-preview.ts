import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { App, ActionSheetController, IonicPage, NavController, NavParams, } from 'ionic-angular';
import { ProjectPage } from '../project/project';
import { ScreenProvider } from '../../providers/screen/screen';
import { SharedTabProvider } from '../../providers/shared-tab/shared-tab';

@IonicPage()
@Component({
  selector: 'page-screen-preview',
  templateUrl: 'screen-preview.html',
})
export class ScreenPreviewPage {
  aspectRatio: string;
  projectId: string;
  projectName: string;
  screenId: string;
  screenName: string;
  components: any = [];

  constructor(
    private appCtrl: App,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private sharedProvider: SharedTabProvider) {
    this.aspectRatio = this.navParams.data.aspectRatio;
    this.projectId = this.navParams.data.projectId;
    this.projectName = this.navParams.data.projectName;
    this.screenId = this.navParams.data.screenId;
    this.screenName = this.navParams.data.screenName;
  }

  computeMultiplier(aspectRatio) {
    const ratio = aspectRatio.split(':');
    return parseInt(ratio[1]) / parseInt(ratio[0]);
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
