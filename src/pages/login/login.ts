import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  constructor(
    private alertCtrl: AlertController,
    private fb: Facebook,
    private navCtrl: NavController,
    private navParams: NavParams,
    private nativeStorage: NativeStorage) {
  }

  async login() {
    let permissions = ['public_profile', 'user_friends', 'email'];

    try {
      const response = await this.fb.login(permissions) as FacebookLoginResponse;
      if(response.status === 'connected') {
        let user = await this.fb.api('/me?fields=name, email', permissions);
        user.id = response.authResponse.userID;
        user.profile_picture = `https://graph.facebook.com/${user.id}/picture?type=square`;
        await this.nativeStorage.setItem('facebook_user', user);
        this.navCtrl.setRoot(HomePage);
      }
    } catch(e) {
      const alert = this.alertCtrl.create({
        title: 'Login Failed',
        message: 'Something went wrong. Please try again.',
        buttons: ['OK']
      });

      alert.present();
    }
  }
}
