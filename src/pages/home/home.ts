import { Component } from '@angular/core';
import {
  IonicPage,
  AlertController,
  Events,
  ModalController,
  NavController,
  NavParams
} from 'ionic-angular';
import { ProjectPage } from './../project/project';
import { TargetPlatformPage } from './../target-platform/target-platform';
import { ProjectProvider } from './../../providers/project/project';
import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  projects: any;

  constructor(
    private alertCtrl: AlertController,
    private events: Events,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private provider: ProjectProvider,
    private navParams: NavParams) {
      // Listen to events for reloading projects list
      this.events.subscribe('reload-home', () => {
        this.getProjects();
      });

      this.getProjects();
  }

  async getProjects() {
    this.projects = null;
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
    this.inputName(this.openModal.bind(this))
  }

  editProject(id) {
    this.inputName(async (newName) => {
      try {
        const response = await this.provider.editProject(id, newName) as any;
        this.showAlert('Rename successful', `The project has been successfully renamed to ${newName}.`);
        this.getProjects();
      } catch(e) {
        throw new Error(e);
      }
    });
  }

  inputName(handler) {
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
              handler(data.name);
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

  formatDate(date) {
    return moment(date).format('MMM DD')
  }
}
