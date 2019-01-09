import { AlertController, App, ActionSheetController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ProjectPage } from '../../pages/project/project';
import * as html2canvas from 'html2canvas';
import { ScreenProvider } from '../screen/screen';

@Injectable()
export class SharedTabProvider {
  loading: Boolean = true;
  hasChanges: Boolean = false;
  navParams: any;
  screen: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private appCtrl: App,
    public http: HttpClient,
    private loadingCtrl: LoadingController,
    private provider: ScreenProvider) {
  }

  alertError() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Something went wrong. Please try again.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  alertSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'The changes has been saved.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  get components() {
    if(!this.screen) {
      return [];
    }

    return this.screen.components;
  }

  discard() {
    this.appCtrl.getRootNavs()[0].setRoot(HomePage, null, { animate: true })
    this.appCtrl.getRootNavs()[0].push(ProjectPage, {
      aspectRatio: this.navParams.data.aspectRatio,
      projectId: this.navParams.data.projectId,
      projectName: this.navParams.data.projectName,
    });
  }

  displaySaving() {
    const savingAlert = this.loadingCtrl.create({
      content: 'Saving changes...',
      dismissOnPageChange: true
    })

    savingAlert.present();
    return savingAlert;
  }

  exitPrompt() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'You have unsaved changes.',
      buttons: [
        {
          text: 'Discard',
          role: 'destructive',
          handler: () => {
            this.discard();
          }
        },
        {
          text: 'Save Changes',
          handler: () => {
            this.saveChanges();
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

  async getScreen(id) {
    try {
      const response = await this.provider.getScreen(id) as any;
      this.loading = false;
      this.screen = response.item;
    } catch (e) {
      throw new Error(e);
    }
  }

  async saveChanges() {
    const savingAlert = this.displaySaving();
    try {
      const canvas = await html2canvas(document.querySelector('#preview-box'), {
        allowTaint: false,
        logging: false,
        scale: 2.5,
        useCORS: true
      });

      const response = await this.provider.updateScreen({
        preview_img:  canvas.toDataURL("image/png"),
        ...this.screen
      });

      this.appCtrl.getRootNavs()[0].setRoot(HomePage, null, { animate: true })
      this.appCtrl.getRootNavs()[0].push(ProjectPage, {
        aspectRatio: this.navParams.data.aspectRatio,
        projectId: this.navParams.data.projectId,
        projectName: this.navParams.data.projectName,
      });
      this.alertSuccess();
    } catch(e) {
      savingAlert.dismiss()
      this.alertError();
      throw new Error(e);
    }
  }

  setParams(navParams) {
    this.navParams = navParams;
  }

  showMore() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Exit Screen',
          role: 'destructive',
          handler: () => {
            if(this.hasChanges) {
              this.exitPrompt();
            } else {
              this.discard();
            }
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
