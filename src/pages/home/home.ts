import { Component } from '@angular/core';
import { IonicPage, AlertController, ModalController, NavController, NavParams } from 'ionic-angular';

import { ProjectPage } from './../project/project';
import { TargetPlatformPage } from './../target-platform/target-platform';
import { ProjectProvider } from './../../providers/project/project';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  projects: any;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private provider: ProjectProvider,
    private navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.getProjects();
  }

  async getProjects() {
    try {
      const response = await this.provider.getProjects() as any;
      this.projects = response.items;
    } catch(e) {
      throw new Error(e);
    }
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
