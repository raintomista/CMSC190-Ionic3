import { AlertController, App, ActionSheetController, LoadingController, NavController, Events } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { ProjectPage } from '../../pages/project/project';
import * as html2canvas from 'html2canvas';
import { ScreenProvider } from '../screen/screen';
import { ScreenHistoryPage } from '../../pages/screen-history/screen-history';

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
    private events: Events,
    public http: HttpClient,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private ngZone: NgZone,
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
    if (!this.screen) {
      return [];
    }

    return this.screen.components;
  }

  computeMultiplier(aspectRatio) {
    const ratio = aspectRatio.split(':');
    return parseInt(ratio[1]) / parseInt(ratio[0]);
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
    this.loading = true;
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
        preview_img: canvas.toDataURL("image/png"),
        ...this.screen
      }, '');

      this.appCtrl.getRootNavs()[0].setRoot(HomePage, null, { animate: true })
      this.appCtrl.getRootNavs()[0].push(ProjectPage, {
        aspectRatio: this.navParams.data.aspectRatio,
        projectId: this.navParams.data.projectId,
        projectName: this.navParams.data.projectName,
      });
      this.alertSuccess();
    } catch (e) {
      savingAlert.dismiss()
      this.alertError();
      throw new Error(e);
    }
  }


  saveScreenshot() {
    this.ngZone.runOutsideAngular(async () => {
      html2canvas(document.getElementById('preview-box'), {
        allowTaint: false,
        logging: false,
        scale: 2.5,
        useCORS: true
      }).then(async (canvas) => {
        await this.provider.updateScreen({
          preview_img: canvas.toDataURL("image/png"),
          ...this.screen
        }, '');
      });
    });
  }


  setParams(navParams) {
    this.navParams = navParams;
  }

  showMore(screenId) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View Screen History',
          handler: () => {
            this.navCtrl.push(ScreenHistoryPage, { screenId: screenId })
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
