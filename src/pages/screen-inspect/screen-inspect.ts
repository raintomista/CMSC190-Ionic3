import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { InspectorPage } from '../inspector/inspector';
import { ScreenProvider } from '../../providers/screen/screen';

@Component({
  selector: 'page-screen-inspect',
  templateUrl: 'screen-inspect.html',
})
export class ScreenInspectPage {
  screenId: string;
  screenName: string;
  aspectRatio: string;
  components: any = [];

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider) {
      this.screenId = this.navParams.data.screenId;
      this.screenName = this.navParams.data.screenName;
      this.aspectRatio = this.navParams.data.aspectRatio;
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

  presentInspector(componentType, event) {
    const componentStyles = getComputedStyle(event.target);
    let modal = this.modalCtrl.create(InspectorPage, { componentType, componentStyles });
    modal.present();
  }
}
