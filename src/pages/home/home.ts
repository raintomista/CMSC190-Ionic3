import { Component } from '@angular/core';
import {
  IonicPage,
  AlertController,
  Events,
  ModalController,
  NavController,
  NavParams
} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
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
    private nativeStorage: NativeStorage,
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
      const user = await this.nativeStorage.getItem('facebook_user');
      const response = await this.provider.getProjects(user.id) as any;
      this.projects = response.items;
    } catch (e) {
      throw new Error(e);
    }
  }

  handleView(projectId, projectName, aspectRatio) {
    this.navCtrl.push(ProjectPage, {
      projectId,
      projectName,
      aspectRatio
    });
  }

  handleAdd() {
    this.inputName({ name: '' }, this.openModal)
  }

  openModal(id, projectName) {
    const modal = this.modalCtrl.create(TargetPlatformPage, { projectName: projectName });
    modal.present();
  }

  handleEdit(project, slidingItem) {
    this.inputName(project, this.editProject);
    slidingItem.close();
  }

  async editProject(project, newName) {
    try {
      const response = await this.provider.editProject(project.id, newName) as any;
      this.showAlert(null, `The project has been successfully renamed to ${newName}.`);
      this.getProjects();
    } catch (e) {
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
    } catch (e) {
      throw new Error(e);
    }
  }

  inputName(project, handler) {
    const prompt = this.alertCtrl.create({
      title: 'Project Name',
      inputs: [{ name: 'name', value: project.name }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            if (data.name.length > 0) {
              handler.call(this, project, data.name)
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
    const currentDate = moment();

    if(moment(currentDate).diff(date, 'days') < 1) {
      return moment(date).format('hh:mm a')
    } else if (moment(currentDate).diff(date, 'days') >= 1 && moment(currentDate).diff(date, 'days') <= 365) {
      return moment(date).format('DD MMM')
    }
    else {
      return moment(date).format('MM/DD/YYYY')
    }
  }
}
