import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Events, IonicPage, ModalController, NavController, NavParams, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { ScreenPreviewPage } from './../screen-preview/screen-preview';
import { ScreenBuildPage } from './../screen-build/screen-build';
import { ScreenInspectPage } from './../screen-inspect/screen-inspect';
import { SharedTabProvider } from '../../providers/shared-tab/shared-tab';
import { InspectorPage } from '../inspector/inspector';
import { EditComponentPage } from '../edit-component/edit-component';
import { ReplaceComponentPage } from '../replace-component/replace-component';
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-screen-tabs',
  templateUrl: 'screen-tabs.html',
  providers: [SharedTabProvider]
})
export class ScreenTabsPage {
  aspectRatio: string;
  mode: string = 'preview';
  projectId: string;
  projectName: string;
  screenId: string;
  screenName: string;
  screensLength: number;
  components: any = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private events: Events,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private sharedProvider: SharedTabProvider,
    private socket: Socket) {
    this.aspectRatio = this.navParams.get('aspectRatio');
    this.projectId = this.navParams.get('projectId');
    this.projectName = this.navParams.get('projectName');
    this.screenId = this.navParams.get('screenId');
    this.screenName = this.navParams.get('screenName');
    this.screensLength = this.navParams.get('screensLength');

    this.sharedProvider.setParams(this.navParams)
    this.sharedProvider.getScreen(this.navParams.data.screenId);

    this.listenChanges();
  }

  ionViewDidLoad() {
    if(this.screensLength == null || this.screensLength <= 1) {
      this.showAlert('Preview Mode', 'This mode allows you to preview your selected screen and interact with its components.')
    }
  }

  ionViewWillLeave() {
    this.sharedProvider.saveScreenshot();
    // setTimeout(() => {
    //   this.events.publish('screen_changes');
    // }, 500);
  }

  listenChanges() {
    this.events.subscribe('component_changes', _ => {
        this.sharedProvider.getScreen(this.screenId);
    })
  }


  parseRGB(rgb) {
    rgb = rgb.replace('rgb(', '').replace(')', '');
    let r = rgb.split(',')[0].trim();
    let g = rgb.split(',')[1].trim();
    let b = rgb.split(',')[2].trim();
    return '#' + this.rgbToHex(r) + this.rgbToHex(g) + this.rgbToHex(b);
  }


  performAction(componentId, componentType, targetElement) {
    switch (this.mode) {
      case 'build':
        this.presentBuildActions(componentId, componentType);
        break;
      case 'inspect':
        this.presentInspector(componentType, targetElement);
        break;
    }
  }

  presentBuildActions(componentId, componentType) {
    let actionSheet = this.actionSheetCtrl.create({
      title: componentType,
      buttons: [
        {
          text: 'Edit Component',
          handler: () => {
            let modal = this.modalCtrl.create(EditComponentPage, {
              componentId: componentId,
              componentType: componentType,
              projectId: this.projectId,
              screenId: this.screenId,
              screenName: this.screenName
            })
            modal.present();
          }
        },
        {
          text: 'Replace Component',
          handler: () => {
            let modal = this.modalCtrl.create(ReplaceComponentPage, {
              componentId: componentId,
              componentType: componentType,
              screenName: this.screenName
            });
            modal.present();
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

  presentInspector(componentType, targetElement) {
    let componentStyles = {};
    switch (componentType) {
      case 'HeaderWithBack':
      case 'HeaderWithMenu':
        let element1 = document.querySelector('.preview-box .toolbar-md');
        let computedStyle1 = getComputedStyle(element1);

        let element2 = document.querySelector('.preview-box .toolbar-background-md')
        let computedStyle2 = getComputedStyle(element2);

        let element3 = document.querySelector('.preview-box .toolbar-title-md');
        let computedStyle3 = getComputedStyle(element3);

        this.parseRGB(computedStyle2['background-color']);

        componentStyles = {
          'background-color': this.parseRGB(computedStyle2['background-color']),
          'color': this.parseRGB(computedStyle3['color']),
          'font-size': computedStyle3['font-size'],
          'font-weight': computedStyle3['font-weight'],
          'height': computedStyle1['height'],
          'min-height': computedStyle1['min-height'],
          'padding': computedStyle1['padding'],
          'width': computedStyle1['width']
        }
        break;
      case 'Image':
        let computedStyle = getComputedStyle(targetElement);
        componentStyles = {
          'height': computedStyle['height'],
          'width': computedStyle['width']
        }
        break;
      case 'TextInput':
      case 'PasswordInput':
      case 'Checkbox':
      case 'Radio':
      case 'ListItem':
        element1 = document.querySelector('.preview-box .item-md');
        computedStyle1 = getComputedStyle(element1);

        element2 = document.querySelector('.preview-box .item-md .item-inner')
        computedStyle2 = getComputedStyle(element2);

        componentStyles = {
          'background-color': this.parseRGB(computedStyle1['background-color']),
          'border-bottom': computedStyle2['border-bottom'],
          'color': this.parseRGB(computedStyle1['color']),
          'font-size': computedStyle1['font-size'],
          'font-weight': computedStyle1['font-weight'],
          'height': computedStyle1['height'],
          'margin': computedStyle1['margin'],
          'padding': computedStyle1['padding'],
          'width': computedStyle1['width'],
        }
        break;
      case 'FAB':
        let element = document.querySelector('.preview-box .fab-md');
        computedStyle = getComputedStyle(element);
        componentStyles = {
          'background-color': this.parseRGB(computedStyle['background-color']),
          'box-shadow': computedStyle['box-shadow'],
          'color': this.parseRGB(computedStyle['color']),
        }
        break;
      case 'Button':
        element = document.querySelector('.preview-box .button-md');
        computedStyle = getComputedStyle(element);
        componentStyles = {
          'background-color': this.parseRGB(computedStyle['background-color']),
          'border-radius': computedStyle['border-radius'],
          'color': this.parseRGB(computedStyle['color']),
          'height': computedStyle['height'],
          'font-size': computedStyle['font-size'],
          'font-weight': computedStyle['font-weight'],
          'text-transform': computedStyle['text-transform'],
        }
        break;
    }


    let modal = this.modalCtrl.create(InspectorPage, { componentType, componentStyles });
    modal.present();
  }


  rgbToHex(rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  }

  selectMode(mode) {
    this.mode = mode;

    if(this.screensLength == null || this.screensLength <= 1) {
      switch(this.mode) {
        case 'build':
          this.showAlert('Build Mode', 'This mode allows you to edit or replace components. <b>TAP</b> and <b>HOLD</b> your desired component to start.')
          break;
        case 'inspect':
          this.showAlert('Inspect Mode', 'This mode allows you to inspect the dimensions and styles of a component. <b>TAP</b> and <b>HOLD</b> your desired component to start.')
          break;
      }
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
}
