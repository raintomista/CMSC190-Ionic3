import { HeaderWithMenu } from './../../models/header-with-menu.model';
import { ImagePicker } from '@ionic-native/image-picker';
import { Socket } from 'ng-socket-io';
import { Component } from '@angular/core';
import { ActionSheetController, LoadingController, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProjectHistoryPage } from '../project-history/project-history';
import { ReviewComponentsPage } from './../review-components/review-components';
import { ScreenTabsPage } from './../screen-tabs/screen-tabs';
import { ScreenProvider } from './../../providers/screen/screen';
import { Observable } from 'rxjs/Observable';
import { ProjectSettingsPage } from '../project-settings/project-settings';
import { Image } from '../../models/image.model';
import pretty from 'pretty';

@Component({
  selector: 'project-page',
  templateUrl: 'project.html',
})
export class ProjectPage {
  user: any;
  aspectRatio: string;
  loading: boolean = true;
  projectId: string = null;
  projectName: string = null;
  screens: any = [];
  selectedFile: string = null;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private file: File,
    private loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider,
    private imagePicker: ImagePicker,
    private socket: Socket) {
    this.projectId = this.navParams.get('projectId');
    this.projectName = this.navParams.get('projectName');
    this.aspectRatio = this.navParams.get('aspectRatio');
    this.getLoggedUser();
    this.getScreens(this.projectId);

    this.listenChanges().subscribe((projectId) => {
      if (this.projectId === projectId) {
        this.refreshScreens(this.projectId);
      }
    });
  }

  addNewScreen() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Add screen to your project',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            this.takePhoto();
          }
        }, {
          text: 'Choose from Library',
          handler: () => {
            this.choosePhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    // Launch camera app
    this.camera.getPicture(options).then(async (imagePath) => {
      const filename = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      const filepath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      await this.copyFileToLocal(filepath, filename); // Store image from cache to local storage
      await this.uploadFile(this.file.dataDirectory + this.selectedFile)
    }, (e) => {
      throw new Error(e);
    });
  }

  /* Helper Functions for Image Upload */
  async copyFileToLocal(filepath, filename) {
    try {
      await this.file.copyFile(filepath, filename, this.file.dataDirectory, filename);
      this.selectedFile = filename; //Store the filename of the selected file
    } catch (e) {
      throw new Error(e);
    }
  }

  async uploadFile(filePath) {
    try {
      // Resolve file from local storage

      const entry = await this.file.resolveLocalFilesystemUrl(filePath);
      (<FileEntry>entry).file((file) => {
        const reader = new FileReader();

        // Executes when the reading operation is completed
        reader.onloadend = () => {
          const blob = new Blob([reader.result], { type: file.type });
          this.sendForm(blob, this.selectedFile);
        };
        reader.readAsArrayBuffer(file);
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async sendForm(file, filename) {
    const formData = new FormData();
    formData.append('file', file, filename);

    this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    }).present();

    try {
      const results = await this.provider.addScreen(formData);
      this.navCtrl.push(ReviewComponentsPage, {
        aspectRatio: this.aspectRatio,
        order: this.screens.length,
        projectId: this.projectId,
        projectName: this.projectName,

        ...results
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  choosePhoto() {
    let options = {
      maximumImagesCount: 1,
      quality: 100
    }

    this.imagePicker.getPictures(options)
      .then(async (results) => {
        if (results.length > 0) {
          await this.uploadFile(results[0]);
        }
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  /* Helper Functions for Templates */
  computeMultiplier(aspectRatio) {
    const ratio = aspectRatio.split(':');
    return parseInt(ratio[0]) / parseInt(ratio[1]);
  }

  confirmDelete(screen, index) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this screen?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteScreen(screen, index);
          }
        }
      ]
    });

    alert.present();
  }

  async deleteScreen(screen, index) {
    try {
      await this.provider.deleteScreen(screen, this.user.id);
      this.screens.splice(index, 1);
      this.showAlert('Success', `You have successfully deleted ${screen.name}`);
    } catch (e) {
      this.showAlert('Error', `Unable to delete screen. Please try again.`);
      throw new Error(e);
    }
  }

  async editScreenName(screen, screenName) {
    try {
      const newScreen = Object.assign({}, screen);
      newScreen.name = screenName;
      await this.provider.updateScreen(newScreen, this.user.id);
      this.showAlert('Success', `You have successfully renamed screen to ${screenName}`);
      screen.name = screenName;
    } catch (e) {
      this.showAlert('Error', `Unable to rename screen. Please try again.`);
      throw new Error(e);
    }
  }

  async exportScreen(screen) {
    const filename = this.generateFilename(screen.name);
    let files = {
      [filename]: {
        "content": await this.generateSourceCode(screen.id)
      },
    }

    let data = {
      description: this.projectName + " - " + screen.name,
      public: true,
      files: files
    }

    let loading = this.loadingCtrl.create({
      content: `Exporting ${screen.name}`,
    });

    loading.present();

    try {
      const gist = await this.provider.exportScreen(data) as any;
      const response = await this.provider.shortenURL(gist.html_url) as any;
      loading.dismiss();
      this.showAlert('Export Success', `You may now access its source code at <a>${response.link}</a>`);
    } catch (e) {
      loading.dismiss();
      this.showAlert('Error', `Unable to export screen. Please try again.`);
      throw new Error(e);
    }
  }

  async generateSourceCode(screenId) {
    let sourceCode = '<ion-content>\n\t</ion-content>';
    let parsedComponents = '';

    try {
      const response = await this.provider.getScreen(screenId) as any;
      for(let i = 0; i < response.item.components.length; i++) {
        let component = response.item.components[i];
        if(i === 0 && component.type === 'HeaderWithMenu') {
          let header = new HeaderWithMenu(component.value);
          sourceCode = header.toSourceCode() + sourceCode;
        }
        else {
          switch(component.type) {
            case 'HeaderWithMenu':
              let header = new HeaderWithMenu(component.value);
              parsedComponents = parsedComponents.concat(header.toSourceCode());
              break;
            case 'Image':
              let image = new Image(component.value);
              parsedComponents = parsedComponents.concat(image.toSourceCode());
              break;
          }
        }
      }
    } catch (e) {
      throw new Error(e);
    }

    return pretty(sourceCode.replace('\t', parsedComponents), {ocd: true})
  }

  generateFilename(screenName) {
    return screenName.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase() + '.html'
  }

  async getLoggedUser() {
    this.user = await this.nativeStorage.getItem('facebook_user');
  }

  async getScreens(projectId) {
    this.loading = true;
    this.screens = [];
    try {
      const response = await this.provider.getScreens(projectId) as any;
      this.screens = response.items;
      this.loading = false;
    } catch (e) {
      throw new Error(e);
    }
  }

  handleView(screenId, screenName) {
    this.navCtrl.push(ScreenTabsPage, {
      aspectRatio: this.aspectRatio,
      projectId: this.projectId,
      projectName: this.projectName,
      screenId: screenId,
      screenName: screenName,
    });

  }

  listenChanges() {
    let observable = new Observable(observer => {
      this.socket.on('screens_changes', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  manageScreen(screen, index) {
    let actionSheet = this.actionSheetCtrl.create({
      title: screen.name,
      buttons: [
        {
          text: 'View',
          handler: () => {
            this.handleView(screen.id, screen.name);
          }
        },
        {
          text: 'Edit',
          handler: () => {
            this.showInputPrompt(screen);
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.confirmDelete(screen, index)
          }
        },
        {
          text: 'Export as Source Code',
          handler: () => {
            this.exportScreen(screen);
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

  async pullToRefresh(refresher) {
    try {
      const response = await this.provider.getScreens(this.projectId) as any;
      this.screens = response.items;
      refresher.complete();
    } catch (e) {
      refresher.complete();
      throw new Error(e);
    }
  }

  async refreshScreens(projectId) {
    try {
      const response = await this.provider.getScreens(projectId) as any;
      this.screens = response.items;
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

  showInputPrompt(screen) {
    const prompt = this.alertCtrl.create({
      title: 'Edit Screen Name',
      inputs: [{ name: 'screenName', value: screen.name }],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            if (data.screenName.length > 0) {
              this.editScreenName(screen, data.screenName);
            } else {
              this.showAlert('Screen name is required.', 'Please try again.');
            }
          }
        }
      ]
    });

    prompt.present();
  }

  showMore() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View Project History',
          handler: () => {
            this.navCtrl.push(ProjectHistoryPage, { projectId: this.projectId })
          }
        },
        {
          text: 'Edit Project Settings',
          handler: () => {
            this.navCtrl.push(ProjectSettingsPage, {
              aspectRatio: this.aspectRatio,
              projectId: this.projectId,
              projectName: this.projectName
            });
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
