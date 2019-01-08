import { InspectorPage } from './../pages/inspector/inspector';
import { ScreenInspectPage } from './../pages/screen-inspect/screen-inspect';
import { ScreenBuildPage } from './../pages/screen-build/screen-build';
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
import { ScreenTabsPage } from './../pages/screen-tabs/screen-tabs';
import { ScreenPreviewPage } from './../pages/screen-preview/screen-preview';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ScreenProvider } from '../providers/screen/screen';
import { ProjectProvider } from '../providers/project/project';
import { ImageComponent } from '../components/image/image';
import { HeaderWithMenuComponent } from '../components/header-with-menu/header-with-menu';
import { LongPressModule } from 'ionic-long-press';
import { SharedTabProvider } from '../providers/shared-tab/shared-tab';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProjectPage,
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
    HomePage,
    ProjectPage,
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
    File,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ScreenProvider,
    ProjectProvider,
    SharedTabProvider
  ]
})
export class AppModule {}
