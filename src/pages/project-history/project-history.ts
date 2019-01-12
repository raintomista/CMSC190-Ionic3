import { NativeStorage } from '@ionic-native/native-storage';
import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectProvider } from './../../providers/project/project';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-project-history',
  templateUrl: 'project-history.html',
})
export class ProjectHistoryPage {
  activityLogs: any = [];
  loading: Boolean = true;
  user: any;

  constructor(
    private alertCtrl: AlertController,
    private nativeStorage: NativeStorage,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ProjectProvider) {
      this.getHistory(this.navParams.get('projectId'));
      this.getLoggedUser();
  }

  formatDate(date) {
    return moment(date).format('MMMM DD, YYYY hh:mm:ss a');
  }

  async getHistory(projectId) {
    try {
      const response = await this.provider.getHistory(projectId) as any;
      this.activityLogs = response.items;
      this.loading = false;
    } catch(e) {
      this.showAlert('Unable to retrieve project history', 'An error occured. Please try again.');
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
