import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenProvider } from '../../providers/screen/screen';

@IonicPage()
@Component({
  selector: 'page-screen-build',
  templateUrl: 'screen-build.html',
})
export class ScreenBuildPage {
  screenId: string;
  screenName: string;
  components: any = [];

  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private provider: ScreenProvider) {
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
    return parseInt(ratio[0]) / parseInt(ratio[1]);
  }

  presentInstruction() {
    let alert = this.alertCtrl.create({
      title: 'Build Mode',
      subTitle: 'Press your desired component to start modifying it.',
      buttons: ['Dismiss']
    })

    alert.present();
  }
}
