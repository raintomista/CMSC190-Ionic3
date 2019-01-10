import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { ProjectPage } from '../pages/project/project';
import { ReviewComponentsPage } from './../pages/review-components/review-components';
import { ScreenTabsPage } from './../pages/screen-tabs/screen-tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  constructor(
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen) {
      this.platform.ready().then(() => {
        nativeStorage.getItem('facebook_user')
          .then((data) => {
            this.rootPage = HomePage;
            this.splashScreen.hide();
            this.statusBar.styleDefault();
          })
          .catch((e) => {
            this.rootPage = LoginPage;
            this.splashScreen.hide();
          this.statusBar.styleDefault();
          });

      });
  }
}

