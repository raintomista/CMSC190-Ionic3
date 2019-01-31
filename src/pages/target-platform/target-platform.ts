import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  Events,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { FormGroup, FormControl } from '@angular/forms';
import { ProjectProvider } from '../../providers/project/project';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-target-platform',
  templateUrl: 'target-platform.html',
})
export class TargetPlatformPage {
  formGroup: FormGroup;

  constructor(
    private alertCtrl: AlertController,
    private events: Events,
    private nativeStorage: NativeStorage,
    private navCtrl: NavController,
    private navParams: NavParams,
    private projectProvider: ProjectProvider,
    private viewCtrl: ViewController) {
      this.formGroup = new FormGroup({
        "aspect_ratio": new FormControl({ value: '3:2', disabled: false }),
        "platform": new FormControl({ value: 'android', disabled: false }),
        "name": new FormControl({ value: this.navParams.get('projectName'), disabled: false })
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
    this.viewCtrl.dismiss();

    try {
      let author = await this.nativeStorage.getItem('facebook_user')
      let newProject = Object.assign({
        author_id: author.id,
        date_created: null, //Update in rethink backend
        date_modified: null, //Update in rethink backend
        no_of_screens: 0,
      }, this.formGroup.value);

      const response = await this.projectProvider.addProject(newProject, author.id);
      this.showAlert('Success', `You have successfully created ${newProject.name}.`);
    } catch(e) {
      this.showAlert('Unable to Create Project', 'An error occurred. Please try again.');
      throw new Error(e);
    }
  }
}
