import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

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
    private navCtrl: NavController,
    private navParams: NavParams,
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

  submit() {
    const project = Object.assign({
      type: 'project',
      no_of_screens: 0,
      date_created: moment().toISOString(),
      date_modified: null,
    }, this.formGroup.value);

    this.viewCtrl.dismiss();
    this.showAlert('Success!', `${project.name} has been created.`)
  }
}
