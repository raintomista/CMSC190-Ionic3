import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  Events,
  NavController,
  NavParams,
  ViewController,
  LoadingController
} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectProvider } from '../../providers/project/project';
import moment from 'moment';
import { ProjectPage } from '../project/project';

@IonicPage()
@Component({
  selector: 'page-project-settings',
  templateUrl: 'project-settings.html',
})
export class ProjectSettingsPage {
  aspectRatio: string;
  projectId: string;
  projectName: string;
  formGroup: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private events: Events,
    private loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage,
    private navCtrl: NavController,
    private navParams: NavParams,
    private projectProvider: ProjectProvider,
    private viewCtrl: ViewController) {
      this.aspectRatio = this.navParams.get('aspectRatio');
      this.projectId = this.navParams.get('projectId');
      this.projectName = this.navParams.get('projectName');

      this.formGroup = new FormGroup({
        "aspect_ratio": new FormControl({ value: this.aspectRatio, disabled: false }),
        "platform": new FormControl({ value: 'android', disabled: false }),
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  async submit() {
    let loading = this.loadingCtrl.create({
      content: 'Saving project settings',
    });

    loading.present();

    try {
      let author = await this.nativeStorage.getItem('facebook_user')
      let settings = this.formGroup.value;
      await this.projectProvider.editProjectSettings(this.projectId, settings, author.id);
      this.navCtrl.popToRoot();
      this.navCtrl.push(ProjectPage, {
        aspectRatio: settings.aspect_ratio,
        projectId: this.projectId,
        projectName: this.projectName
      });
      loading.dismiss();
      this.showAlert('Success', `You have successfully edited project settings.`);

    } catch(e) {
      this.showAlert('Unable to Create Project', 'An error occurred. Please try again.');
      throw new Error(e);
    }
  }
}
