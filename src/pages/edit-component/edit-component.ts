import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { File, FileEntry } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertProvider } from './../../providers/alert/alert';
import { ScreenProvider } from './../../providers/screen/screen';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-edit-component',
  templateUrl: 'edit-component.html',
})
export class EditComponentPage {
  /* Nav Params */
  componentId: string;
  componentType: string;
  screenName: string;
  user: any;

  form: FormGroup = null;
  loading: Boolean = true;

  constructor(
    private alertProvider: AlertProvider,
    private file: File,
    private fb: FormBuilder,
    private imagePicker: ImagePicker,
    private loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider,
    private viewCtrl: ViewController) {
    this.componentId = this.navParams.get('componentId');
    this.componentType = this.navParams.get('componentType');
    this.screenName = this.navParams.get('screenName');

    // Instantiate form
    this.form = this.fb.group({
      'order': '',
      'type': '',
      'value': '',
    });

    this.getComponent(); // Get value of the selected component
    this.getLoggedUser(); // Get logged user
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  async getComponent() {
    try {
      const response = await this.provider.getComponent(this.componentId) as any;
      this.form.setValue({
        'order': response.item.order,
        'type': response.item.type,
        'value': response.item.value,
      });
      this.loading = false;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getLoggedUser() {
    this.user = await this.nativeStorage.getItem('facebook_user');
  }

  replaceImage() {
    let options = {
      maximumImagesCount: 1,
      quality: 100
    }

    this.imagePicker.getPictures(options)
      .then(async (results) => {
        if (results.length > 0) {
          this.resolveImage(results[0]);
        }
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  async resolveImage(filePath) {
    try {
      const entry = await this.file.resolveLocalFilesystemUrl(filePath);
      (<FileEntry>entry).file((file) => {
        const reader = new FileReader();

        // Executes when the reading operation is completed
        reader.onloadend = () => {
          const blob = new Blob([reader.result], { type: file.type });
          this.uploadImage(blob);
        };
        reader.readAsArrayBuffer(file);
      });
    } catch (e) {
      throw new Error(e);
    }
  }


  async saveChanges() {
    let loadingAlert = this.alertProvider.showLoading('Saving changes');
    let activityDescription = `Edited ${this.componentType}`;

    switch (this.componentType) {
      case 'HeaderWithMenu':
        activityDescription += ' title';
        break;
      case 'Image':
        activityDescription += ' src';
        break;
      case 'TextInput':
        activityDescription += ' text';
        break;
    }

    try {
      const response = await this.provider.updateComponent(this.componentId, 'edit', {
        activity_description: activityDescription,
        updated_component: this.form.value,
        user_id: this.user.id
      });

      this.alertProvider.showAlert('Success', `You have successfully edited ${this.componentType}.`);
      loadingAlert.dismiss();
      this.dismiss();
    } catch (e) {
      this.alertProvider.showAlert('Error', `Unable to edit ${this.form.get('type').value}. Please try again.`);
      loadingAlert.dismiss();
      throw new Error(e);
    }
  }

  async uploadImage(file) {
    let loadingAlert = this.loadingCtrl.create({
      content: `Uploading 0%`
    });

    loadingAlert.present();

    this.provider.uploadImage(file)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.setLoadingText(`Uploading ${Math.round(100 * event.loaded / event.total)}%`);
        } else if (event instanceof HttpResponse) {
          loadingAlert.dismiss();
          this.form.patchValue({ value: event.body.file_url });
        }
      });
  }

  setLoadingText(text: string) {
    const elem = document.querySelector('div.loading-wrapper div.loading-content');
    if (elem) elem.innerHTML = text;
  }
}
