import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectPage } from '../pages/project/project';
import { TargetPlatformPage } from './../pages/target-platform/target-platform';
import { ReviewComponentsPage } from './../pages/review-components/review-components';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ScreenProvider } from '../providers/screen/screen';
import { ProjectProvider } from '../providers/project/project';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProjectPage,
    TargetPlatformPage,
    ReviewComponentsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProjectPage,
    TargetPlatformPage,
    ReviewComponentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    File,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScreenProvider,
    ProjectProvider
  ]
})
export class AppModule {}
