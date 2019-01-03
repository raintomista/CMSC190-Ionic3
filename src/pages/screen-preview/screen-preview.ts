import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenProvider } from '../../providers/screen/screen';

@IonicPage()
@Component({
  selector: 'page-screen-preview',
  templateUrl: 'screen-preview.html',
})
export class ScreenPreviewPage {
  screenId: string;
  screenName: string;
  components: any = [];


  constructor(
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

  computeMultiplier(aspectRatio) {
    const ratio = aspectRatio.split(':');
    return parseInt(ratio[0]) / parseInt(ratio[1]);
  }
}
