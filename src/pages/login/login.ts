import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { HomePage } from './../home/home';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  constructor(
    private alertCtrl: AlertController,
    private events: Events,
    private fb: Facebook,
    private navCtrl: NavController,
    private navParams: NavParams,
    private nativeStorage: NativeStorage,
    private userProvider: UserProvider) {
  }

  async login() {
    let permissions = ['public_profile', 'email']; // Set facebook login permission

    try {
      // Login
      const response = await this.fb.login(permissions) as FacebookLoginResponse;

      // Check if response status is connected
      if (response.status === 'connected') {

        // Retrieve necessary user information
        let user = await this.fb.api('/me?fields=name, email', permissions);
        user.id = response.authResponse.userID;
        user.profile_picture = `https://graph.facebook.com/${user.id}/picture?type=square`;

        // Check if user is a new user
        let _response = await this.userProvider.getUser(user.id) as any;

        // Add user credentials to db for new users
        if (_response.user === null) {
          await this.userProvider.signup({ user })
          this.welcomeDialog();
        }

        // Set session
        await this.nativeStorage.setItem('facebook_user', user);
        this.navCtrl.setRoot(HomePage);
      }
    } catch (e) {
      this.alertCtrl.create({
        title: 'Login Failed',
        message: 'Something went wrong. Please try again.',
        buttons: ['OK']
      }).present();
    }
  }


  welcomeDialog() {
    this.alertCtrl.create({
      title: 'Welcome to Drawtotype',
      subTitle: 'You may now start turning your whiteboard drawings into interactive prototypes!',
      buttons: [
        {
          text: 'Get Started',
          handler: () => {
            this.events.publish('get_started');
          }
        }
      ]
    }).present();
  }
}
