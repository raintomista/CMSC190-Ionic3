


import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { NativeStorage } from '@ionic-native/native-storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from './../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProjectPage } from '../pages/project/project';
import { TargetPlatformPage } from './../pages/target-platform/target-platform';
import { ReviewComponentsPage } from './../pages/review-components/review-components';
import { ScreenTabsPage } from './../pages/screen-tabs/screen-tabs';
import { ScreenPreviewPage } from './../pages/screen-preview/screen-preview';
import { ScreenInspectPage } from './../pages/screen-inspect/screen-inspect';
import { ScreenBuildPage } from './../pages/screen-build/screen-build';
import { InspectorPage } from './../pages/inspector/inspector';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ScreenProvider } from '../providers/screen/screen';
import { ProjectProvider } from '../providers/project/project';
import { ImageComponent } from '../components/image/image';
import { HeaderWithMenuComponent } from '../components/header-with-menu/header-with-menu';
import { LongPressModule } from 'ionic-long-press';
import { ProjectHistoryPage } from '../pages/project-history/project-history';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProjectPage,
    ProjectHistoryPage,
    TargetPlatformPage,
    ReviewComponentsPage,
    ScreenTabsPage,
    ScreenPreviewPage,
    ScreenBuildPage,
    ScreenInspectPage,
    InspectorPage,
    HeaderWithMenuComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LongPressModule,
    IonicModule.forRoot(MyApp, {
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProjectPage,
    ProjectHistoryPage,
    TargetPlatformPage,
    ReviewComponentsPage,
    ScreenTabsPage,
    ScreenPreviewPage,
    ScreenBuildPage,
    ScreenInspectPage,
    InspectorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Facebook,
    File,
    FilePath,
    NativeStorage,
    ScreenProvider,
    ProjectProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
