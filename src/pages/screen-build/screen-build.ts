import { Component } from '@angular/core';
import { AlertController, App, IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ScreenProvider } from '../../providers/screen/screen';
import { HomePage } from '../home/home';
import { ProjectPage } from '../project/project';

@IonicPage()
@Component({
  selector: 'page-screen-build',
  templateUrl: 'screen-build.html',
})
export class ScreenBuildPage {
  aspectRatio: string;
  projectId: string;
  projectName: string;
  screenId: string;
  screenName: string;
  components: any = [];

  constructor(
    private appCtrl: App,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
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

  ionViewDidLoad() {
    this.presentInstruction();
  }

  computeMultiplier(aspectRatio) {
    const ratio = aspectRatio.split(':');
    return parseInt(ratio[1]) / parseInt(ratio[0]);
  }

  presentActionSheet(component) {
    let actionSheet = this.actionSheetCtrl.create({
      title: component.type,
      buttons: [
        {
          text: 'Edit Component',
          handler: () => {

          }
        },
        { text: 'Cancel', role: 'cancel'}
      ]
    });

    actionSheet.present();
  }

  presentInstruction() {
    let alert = this.alertCtrl.create({
      title: 'Build Mode',
      subTitle: 'Press your desired component to start modifying it.',
      buttons: ['Dismiss']
    })

    alert.present();
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
