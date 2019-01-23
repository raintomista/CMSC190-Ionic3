import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
import { Events, IonicPage, NavController, NavParams, ViewController,  } from 'ionic-angular';
import { HeaderWithMenu } from './../../models/header-with-menu.model';
import { Image } from '../../models/image.model';
import { AlertProvider } from './../../providers/alert/alert';
import { ScreenProvider } from './../../providers/screen/screen';

@IonicPage()
@Component({
  selector: 'page-replace-component',
  templateUrl: 'replace-component.html',
})
export class ReplaceComponentPage {
  alertVisible: boolean;
  componentId: any;
  componentType: any;
  items: any;
  loadingAlert: any;
  selected: number;

  constructor(
    private alertProvider: AlertProvider,
    private events: Events,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider,
    private socket: Socket,
    private viewCtrl: ViewController) {
      this.alertVisible = false;
      this.componentId = this.navParams.get('componentId');
      this.componentType = this.navParams.get('componentType');
      this.items = ['HeaderWithMenu', 'Image'];
      this.selected = null;

      this.listenChanges().subscribe((projectId) => {
        if(!this.alertVisible) {
          this.alertProvider.showAlert('Success', `You have successfully replaced the selected component.`);
          this.alertVisible = true;
          this.loadingAlert.dismiss();
          this.dismiss();
        }
      });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  listenChanges() {
    let observable = new Observable(observer => {
      this.socket.on('screens_changes', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  async replace() {
    let selectedItem = this.items[this.selected];
    let component = null;

    switch (selectedItem) {
      case 'HeaderWithMenu':
        component = new HeaderWithMenu();
        break;
      case 'Image':
        component = new Image();
        break;
    }

    this.loadingAlert = this.alertProvider.showLoading('Saving changes');

    try {
      const response = await this.provider.updateComponent(this.componentId, component);
    } catch (e) {
      this.alertProvider.showAlert('Error', `Unable to replace the selected component. Please try again.`);
      throw new Error(e);
    }
  }

  select(idx) {
    this.selected = idx;
  }

}
