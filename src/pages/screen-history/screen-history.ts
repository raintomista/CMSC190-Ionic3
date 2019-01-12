import { ScreenProvider } from './../../providers/screen/screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-screen-history',
  templateUrl: 'screen-history.html',
})
export class ScreenHistoryPage {
  activityLogs: any = [];
  loading: Boolean = true;
  user: any;

  constructor(
    private alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider) {
      this.getHistory(this.navParams.get('screenId'));
      this.getLoggedUser();
  }

  formatDate(date) {
    return moment(date).format('MMMM DD, YYYY hh:mm:ss a');
  }

  async getHistory(screenId) {
    try {
      const response = await this.provider.getHistory(screenId) as any;
      this.activityLogs = response.items;
      this.loading = false;
    } catch(e) {
      console.log(e)
      this.showAlert('Unable to retrieve screen history', 'An error occured. Please try again.');
      this.navCtrl.pop();
      throw new Error(e);
    }
  }

  async getLoggedUser() {
    this.user = await this.nativeStorage.getItem('facebook_user');
  }

  showAlert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle
    });

    alert.present();
  }
}
