import { AlertController, App, ActionSheetController, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ProjectPage } from '../../pages/project/project';
import * as html2canvas from 'html2canvas';

@Injectable()
export class SharedTabProvider {
  navParams: any;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private appCtrl: App,
    private loadingCtrl: LoadingController,
    public http: HttpClient) {
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

  discard() {
    this.appCtrl.getRootNavs()[0].setRoot(HomePage, null, { animate: true })
    this.appCtrl.getRootNavs()[0].push(ProjectPage, {
      aspectRatio: this.navParams.data.aspectRatio,
      projectId: this.navParams.data.projectId,
      projectName: this.navParams.data.projectName,
    });
  }

  displaySaving() {
    this.loadingCtrl.create({
      content: 'Saving changes...',
      dismissOnPageChange: true
    }).present();
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

  async saveChanges() {
    this.displaySaving();
    try {
      const canvas = await html2canvas(document.querySelector('#preview-box'), {
        allowTaint: false,
        useCORS: true
      });
      const screenshot = canvas.toDataURL("image/png");
      // await saveToDB(screenId, screenshot)
      this.appCtrl.getRootNavs()[0].setRoot(HomePage, null, { animate: true })
      this.appCtrl.getRootNavs()[0].push(ProjectPage, {
        aspectRatio: this.navParams.data.aspectRatio,
        projectId: this.navParams.data.projectId,
        projectName: this.navParams.data.projectName,
      });
      this.alertSuccess();
    } catch(e) {
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
            this.exitPrompt();
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
