import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { Toast } from '@ionic-native/toast';
import { Shake } from '@ionic-native/shake';
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenProvider } from './../../providers/screen/screen';

@IonicPage()
@Component({
  selector: 'page-fullscreen',
  templateUrl: 'fullscreen.html',
})
export class FullscreenPage {
  loading: boolean;
  projectId: string;
  projectName: string;
  screen: any;
  screenId: string;
  screens: any[];
  watch: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider,
    private shake: Shake,
    private statusBar: StatusBar,
    private toast: Toast) {
      this.toast.show('Entering fullscreen mode', '1000', 'bottom').subscribe();
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#f4f4f4');

      this.projectId = this.navParams.get('projectId');
      this.projectName = this.navParams.get('projectName');
      this.screenId = this.navParams.get('screenId');
      this.getScreen(this.screenId);

      // Listen to shake event
      this.watch = this.shake.startWatch(60).subscribe(() => {
        this.showActionsheet();
      });
  }

  ionViewWillLeave() {
    // Remove shake event listener
    this.watch.unsubscribe();

    this.statusBar.styleLightContent();
    this.statusBar.backgroundColorByHexString('#2270e5');
  }

  get components() {
    if (!this.screen) {
      return [];
    }

    return this.screen.components;
  }

  async getScreen(id) {
    this.loading = true;
    try {
      const response = await this.provider.getScreens(this.projectId) as any;
      this.screens = response.items;
      this.screen = this.screens.find((screen) => screen.id === id);
      this.loading = false;
    } catch (e) {
      throw new Error(e);
    }
  }

  navigateTo(targetId) {
    if (targetId === null) {
      this.toast.show(`This component has no target screen`, '1000', 'bottom').subscribe();
    } else {
      this.screenId = targetId;
      this.screen = this.screens.find((screen) => screen.id === this.screenId);
      this.toast.show(`Navigated to ${this.screen.name}`, '1000', 'bottom').subscribe();
    }
  }

  pressEvent() {
    this.navCtrl.pop();
    this.toast.show('Exiting fullscreen mode', '1000', 'bottom').subscribe();
  }

  showActionsheet() {
    this.actionSheetCtrl.create({
      title: `${this.projectName} (Fullscreen Mode)`,
      buttons: [
        {
          text: 'Exit',
          role: 'destructive',
          handler: () => {
            this.pressEvent()
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).present();
  }
}
