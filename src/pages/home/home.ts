import { Component } from '@angular/core';
import { IonicPage, AlertController, ModalController, NavController, NavParams } from 'ionic-angular';

import { ProjectPage } from './../project/project';
import { TargetPlatformPage } from './../target-platform/target-platform';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  projects = [
    { name: 'Project 1', totalScreens: 10},
    { name: 'Project 2', totalScreens: 6},
  ];

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams) {
  }

  viewProject(id) {
    this.navCtrl.push(ProjectPage, { id: id });
  }

  addNewProject() {
    const prompt = this.alertCtrl.create({
      title: 'Project Name',
      inputs: [{ name: 'name' }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            if(data.name.length > 0) {
              this.openModal(data.name);
            } else {
              this.showAlert('Project name is required.', 'Please try again.');
            }
          }
        }
      ]
    });

    prompt.present();
  }

  openModal(projectName) {
    const modal = this.modalCtrl.create(TargetPlatformPage, { projectName: projectName });
    modal.present();
  }

  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
