import { ScreenTabsPage } from './../screen-tabs/screen-tabs';
import { AlertProvider } from './../../providers/alert/alert';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { ScreenProvider } from './../../providers/screen/screen';
import { HeaderWithMenu } from './../../models/header-with-menu.model';
import { Image } from '../../models/image.model';

@IonicPage()
@Component({
  selector: 'page-review-components',
  templateUrl: 'review-components.html',
})
export class ReviewComponentsPage {
  reorder_mode: boolean = true;
  original_file: string;
  labelled_file: string;
  processing_time: number;
  detected_components: any[];

  aspectRatio: string;
  order: number;
  projectId: string;
  projectName: string;

  constructor(
    private alertProvider: AlertProvider,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider) {
    this.original_file = this.navParams.get('original_file');
    this.labelled_file = this.navParams.get('labelled_file');
    this.detected_components = this.navParams.get('detected_components');
    this.processing_time = this.navParams.get('processing_time');

    this.aspectRatio = this.navParams.get('aspectRatio');
    this.order = this.navParams.get('order');
    this.projectId = this.navParams.get('projectId');
    this.projectName = this.navParams.get('projectName');
  }

  exit() {
    this.navCtrl.pop();
  }

  async proceed() {
    let components = [];
    for (let component of this.detected_components) {
      switch (component.name) {
        case 'HeaderWithMenu':
          components.push(new HeaderWithMenu());
          break;
        case 'Image':
          components.push(new Image())
          break;
      }
    }

    let loading = this.loadingCtrl.create({
      content: 'Creating new screen',
    });

    loading.present();

    try {
      let response = await this.provider.createComponents({
        components: components,
        order: this.order,
        project_id: this.projectId
      }) as any;

      loading.dismiss()
      this.navCtrl.pop();
      this.navCtrl.push(ScreenTabsPage, {
        aspectRatio: this.aspectRatio,
        projectId: this.projectId,
        projectName: this.projectName,
        screenId: response.screen_id,
        screenName: response.screen_name
      });
    } catch (e) {
      loading.dismiss()
      this.alertProvider.showAlert('Error', 'Unable to create screen. Please try again later.')
      throw new Error(e);
    }
  }

  reorderItems(indexes) {
    let element = this.detected_components[indexes.from];
    this.detected_components.splice(indexes.from, 1);
    this.detected_components.splice(indexes.to, 0, element);
  }
}
