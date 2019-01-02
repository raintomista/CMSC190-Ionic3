import { Component } from '@angular/core';
import { ActionSheetController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileEntry } from '@ionic-native/file';
import { ReviewComponentsPage } from './../review-components/review-components';
import { ScreenTabsPage } from './../screen-tabs/screen-tabs';
import { ScreenProvider } from './../../providers/screen/screen';

@Component({
  selector: 'project-page',
  templateUrl: 'project.html',
})
export class ProjectPage {
  projectId: string = null;
  projectName: string = null;
  selectedFile: string = null;
  screens = [
    {
      name: 'Homescreen',
      order: 1,
      previewUrl: 'https://www.digitaltrends.com/wp-content/uploads/2012/09/iphone-5-ios-6-home.jpeg'
    },
    {
      name: 'Settings',
      order: 2,
      previewUrl: 'https://d1alt1wkdk73qo.cloudfront.net/images/guide/b81804a9b4c244929d06dbc7073c533d/640x960.jpg'
    }
  ];

  constructor(
    private camera: Camera,
    private file: File,
    private loadingCtrl: LoadingController,
    private provider: ScreenProvider,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private navParams: NavParams) {
    this.projectId = this.navParams.get('projectId');
    this.projectName = this.navParams.get('projectName');
  }

  handlePress(screenName) {
    this.navCtrl.push(ScreenTabsPage, { screenName });
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
}
