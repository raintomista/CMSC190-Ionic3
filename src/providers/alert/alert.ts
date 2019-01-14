import { AlertController, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertProvider {

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
  }

  showAlert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });

    alert.present();
  }

  showLoading(content) {
    const loadingAlert = this.loadingCtrl.create({
      content: content,
      dismissOnPageChange: true
    })

    loadingAlert.present();
    return loadingAlert;
  }
}
