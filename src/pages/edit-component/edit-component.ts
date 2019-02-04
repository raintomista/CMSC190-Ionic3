import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { AlertProvider } from './../../providers/alert/alert';
import { ScreenProvider } from './../../providers/screen/screen';

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
    private fb: FormBuilder,
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
        'value': ''
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
        'value': response.item.value
      });
      this.loading = false;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getLoggedUser() {
    this.user = await this.nativeStorage.getItem('facebook_user');
  }

  async saveChanges() {
    let loadingAlert = this.alertProvider.showLoading('Saving changes');
    let activityDescription = `Edited ${this.componentType}`;

    switch(this.componentType) {
      case 'HeaderWithMenu':
        activityDescription += ' title';
        break;
      case 'Image':
        activityDescription += ' src';
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
}
