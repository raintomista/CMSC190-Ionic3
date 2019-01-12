import { Component } from '@angular/core';
import { ActionSheetController, LoadingController, NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProjectHistoryPage } from '../project-history/project-history';
import { ReviewComponentsPage } from './../review-components/review-components';
import { ScreenTabsPage } from './../screen-tabs/screen-tabs';
import { ScreenProvider } from './../../providers/screen/screen';

@Component({
  selector: 'project-page',
  templateUrl: 'project.html',
})
export class ProjectPage {
  user: any;
  projectId: string = null;
  projectName: string = null;
  aspectRatio: string;
  selectedFile: string = null;
  screens: any = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private file: File,
    private loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider) {
      this.projectId = this.navParams.get('projectId');
      this.projectName = this.navParams.get('projectName');
      this.aspectRatio = this.navParams.get('aspectRatio');
      this.getLoggedUser();
      this.getScreens(this.projectId);
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

  async getScreens(projectId) {
    try {
      const response = await this.provider.getScreens(projectId) as any;
      this.screens = response.items;
    } catch (e) {
      throw new Error(e);
    }
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
            // this.choosePhoto();
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
      await this.uploadFile()
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

  async uploadFile() {
    const filePath = this.file.dataDirectory + this.selectedFile;

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
      this.navCtrl.push(ReviewComponentsPage, results);
    } catch (e) {
      throw new Error(e);
    }
  }

  /* Helper Functions for Templates */
  computeMultiplier(aspectRatio) {
    const ratio = aspectRatio.split(':');
    return parseInt(ratio[0]) / parseInt(ratio[1]);
  }

  async deleteScreen(screen) {
    try {
      await this.provider.deleteScreen(screen, this.user.id);
      this.getScreens(this.projectId);
      this.showAlert('Success', `Successfully deleted ${screen.name}`);
    } catch(e) {
      this.showAlert('Error', `Something went wrong. Please try again.`);
      throw new Error(e);
    }
  }

  async editScreenName(screen, screenName) {
    try {
      const newScreen = Object.assign({}, screen);
      newScreen.name = screenName;
      await this.provider.updateScreen(newScreen, this.user.id);
      this.showAlert('Success', `Successfully changed screen name to ${screenName}`);
      screen.name = screenName;
    } catch(e) {
      this.showAlert('Error', `Something went wrong. Please try again.`);
      throw new Error(e);
    }
  }

  async getLoggedUser() {
    this.user = await this.nativeStorage.getItem('facebook_user');
  }

  manageScreen(screen) {
    let actionSheet = this.actionSheetCtrl.create({
      title: screen.name,
      buttons: [
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
            this.deleteScreen(screen)
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
      inputs: [{ name:  'screenName', value: screen.name }],
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
      buttons:[
        {
          text: 'View Project History',
          handler: () => {
            this.navCtrl.push(ProjectHistoryPage, { projectId: this.projectId})
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
