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

  handleAdd() {
    this.inputName(null, this.openModal)
  }

  openModal(id, projectName) {
    const modal = this.modalCtrl.create(TargetPlatformPage, { projectName: projectName });
    modal.present();
  }

  handleEdit(id, slidingItem) {
    this.inputName(id, this.editProject);
    slidingItem.close();
  }

  async editProject(id, newName) {
    try {
      const response = await this.provider.editProject(id, newName) as any;
      this.showAlert(null, `The project has been successfully renamed to ${newName}.`);
      this.getProjects();
    } catch(e) {
      throw new Error(e);
    }
  }

  handleDelete(id, slidingItem) {
    this.showConfirm(this.deleteProject.bind(this, id));
    slidingItem.close();
  }

  async deleteProject(id) {
    try {
      const response = await this.provider.deleteProject(id) as any;
      this.showAlert(null, `The project has been successfully deleted.`);
      this.getProjects();
    } catch(e) {
      throw new Error(e);
    }
  }

  inputName(id, handler) {
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
              handler.call(this, id, data.name)
            } else {
              this.showAlert('Project name is required.', 'Please try again.');
            }
          }
        }
      ]
    });

    prompt.present();
  }

  showAlert(title, subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  showConfirm(handler) {
    const confirm = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure you want to delete this project?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          handler: handler
        }
      ]
    });

    confirm.present();
  }

  formatDate(date) {
    return moment(date).format('MMM DD')
  }
}
