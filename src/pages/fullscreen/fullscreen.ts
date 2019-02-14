import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { ScreenProvider } from './../../providers/screen/screen';

@IonicPage()
@Component({
  selector: 'page-fullscreen',
  templateUrl: 'fullscreen.html',
})
export class FullscreenPage {
  loading: boolean;
  projectId: string;
  screen: any;
  screenId: string;
  screens: any[];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider,
    private toast: Toast) {
      this.projectId = this.navParams.get('projectId')
      this.screenId = this.navParams.get('screenId')
      this.getScreen(this.screenId);
      this.toast.show('Entering fullscreen mode', '1000', 'bottom').subscribe();
  }

  get components() {
    if (!this.screen) {
      return [];
    }

    return this.screen.components;
  }

  async getScreen(id) {
    try {
      const response = await this.provider.getScreens(this.projectId) as any;
      this.screens = response.items;
      this.screen = this.screens.find((screen) => screen.id === id);
    } catch (e) {
      throw new Error(e);
    }
  }

  navigateTo(targetId) {
    if(targetId === null) {
      this.toast.show(`This component has no target screen`, '1000', 'bottom').subscribe();
    } else {
      this.screenId = targetId;
      this.screen = this.screens.find((screen) => screen.id === this.screenId);
      this.toast.show(`Navigated to ${this.screen.name}`, '1000', 'bottom').subscribe();
    }
  }

  pressEvent(event) {
    this.navCtrl.pop();
    this.toast.show('Exiting fullscreen mode', '1000', 'bottom').subscribe();
  }
}
