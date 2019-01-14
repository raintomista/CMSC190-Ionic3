import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertProvider } from './../../providers/alert/alert';
import { ScreenProvider } from './../../providers/screen/screen';
import { FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-edit-component',
  templateUrl: 'edit-component.html',
})
export class EditComponentPage {
  componentId: string;
  form: FormGroup = null;
  loading: Boolean = true;

  constructor(
    private alertProvider: AlertProvider,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: ScreenProvider,
    private viewCtrl: ViewController) {
    this.componentId = this.navParams.get('componentId');
    this.getComponent();
    this.form = this.fb.group({
      'order': '',
      'type': '',
      'value': ''
    })
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

  async saveChanges() {
    let loadingAlert = this.alertProvider.showLoading('Saving changes');

    try {
      const response = await this.provider.updateComponent(this.componentId, this.form.value);
      this.alertProvider.showAlert('Success', `You have successfully edited ${this.form.get('type').value}.`);
      loadingAlert.dismiss();
      this.dismiss();
    } catch (e) {
      this.alertProvider.showAlert('Error', `Unable to edit ${this.form.get('type').value}. Please try again.`);
      throw new Error(e);
    }
  }
}
