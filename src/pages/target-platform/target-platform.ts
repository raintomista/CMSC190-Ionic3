import { Component } from '@angular/core';
import {
  AlertController,
  IonicPage,
  Events,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
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
    private navCtrl: NavController,
    private navParams: NavParams,
    private projectProvider: ProjectProvider,
    private viewCtrl: ViewController) {
      this.formGroup = new FormGroup({
        "aspectRatio": new FormControl({ value: '3:2', disabled: false }),
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
    const newProject = Object.assign({
      no_of_screens: 0,
      date_created: moment().toISOString(),
      date_modified: null,
    }, this.formGroup.value);

    try {
      const response = await this.projectProvider.addProject(newProject);
      this.showAlert('Success!', `${newProject.name} has been successfully created.`);
      this.viewCtrl.dismiss();
      this.events.publish('reload-home');
    } catch(e) {
      this.showAlert('Error!', 'An error occurred. Please try again.');
      throw new Error(e);
    }
  }
}
