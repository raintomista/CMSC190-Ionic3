import { Component } from '@angular/core';
import {
  IonicPage,
  ActionSheetController,
  AlertController,
  Events,
  ModalController,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { Socket } from 'ng-socket-io';
import { LoginPage } from './../login/login';
import { ProjectPage } from './../project/project';
import { TargetPlatformPage } from './../target-platform/target-platform';
import { ProjectProvider } from './../../providers/project/project';
import moment from 'moment';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user: any;
  projects: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private events: Events,
    private fb: Facebook,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private nativeStorage: NativeStorage,
    private provider: ProjectProvider,
    private socket: Socket) {
      this.getLoggedUser();
      this.getProjects();

      this.socket.connect();

      this.listenChanges();
  }

  ionViewWillUnload() {
    this.events.unsubscribe('get_started');
  }

  async deleteProject(id) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    try {
      const response = await this.provider.deleteProject(id, this.user.id) as any;
      this.refreshProjects();
      loading.dismiss();
      this.showAlert('Success', `You have successfully deleted the project.`);
    } catch (e) {
      throw new Error(e);
    }
  }

  async editProject(project, newName) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    try {
      const response = await this.provider.editProject(project.id, newName, this.user.id) as any;
      this.refreshProjects();
      loading.dismiss();
      this.showAlert('Success', `You have successfully renamed the project to ${newName}.`);
    } catch (e) {
      throw new Error(e);
    }
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

  async getProjects() {
    this.projects = null;
    try {
      this.user = await this.nativeStorage.getItem('facebook_user');
      const response = await this.provider.getProjects(this.user.id) as any;
      this.projects = response.items;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getLoggedUser() {
    this.user = await this.nativeStorage.getItem('facebook_user');
  }

  handleAdd() {
    this.inputName({ name: '' }, this.openModal)
  }

  handleDelete(id, slidingItem) {
    this.showConfirm(this.deleteProject.bind(this, id));
    slidingItem.close();
  }

  handleEdit(project, slidingItem) {
    this.inputName(project, this.editProject);
    slidingItem.close();
  }

  handleView(projectId, projectName, aspectRatio) {
    this.navCtrl.push(ProjectPage, {
      projectId,
      projectName,
      aspectRatio
    });
  }

  inputName(project, handler) {
    const prompt = this.alertCtrl.create({
      title: 'New Project Name',
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
              this.showAlert('Cannot create project', 'A project name is required to create a new project.');
            }
          }
        }
      ]
    });

    prompt.present();
  }

  listenChanges() {
    this.events.subscribe('get_started', _ => {
      setTimeout(() => {
        this.handleAdd();
      }, 1000);
    });

    this.events.subscribe('project_changes', _ => {
      this.refreshProjects();
    });
  }

  async logout() {
    try {
      this.fb.logout();
      this.nativeStorage.remove('facebook_user');
      this.navCtrl.setRoot(LoginPage);
    } catch(e) {
      this.showAlert('Logout Failed', 'An error occured. Please try again.')
    }
  }

  openModal(id, projectName) {
    const modal = this.modalCtrl.create(TargetPlatformPage, { projectName: projectName });
    modal.present();
  }

  async pullToRefresh(refresher) {
    try {
      this.user = await this.nativeStorage.getItem('facebook_user');
      const response = await this.provider.getProjects(this.user.id) as any;
      this.projects = response.items;
      refresher.complete()
    } catch (e) {
      refresher.complete()
      throw new Error(e);
    }
  }

  async refreshProjects() {
    try {
      this.user = await this.nativeStorage.getItem('facebook_user');
      const response = await this.provider.getProjects(this.user.id) as any;
      this.projects = response.items;
    } catch (e) {
      throw new Error(e);
    }
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
      title: 'Confirm Delete',
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

  showUserActionsheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: `${this.user.name} (${this.user.email})`,
      buttons: [
        {
          text: 'Log Out',
          role: 'destructive',
          handler: () => {
            this.logout();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }
}
