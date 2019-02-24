import { FullscreenPage } from './../pages/fullscreen/fullscreen';
import { ImagePicker } from '@ionic-native/image-picker';
import { EditComponentPage } from './../pages/edit-component/edit-component';

// Component Imports
import { HeaderWithMenuComponent } from '../components/header-with-menu/header-with-menu';
import { HeaderWithBackComponent } from './../components/header-with-back/header-with-back';
import { ImageComponent } from '../components/image/image';
import { TextInputComponent } from './../components/text-input/text-input';
import { PasswordInputComponent } from './../components/password-input/password-input';
import { FloatingActionButtonComponent } from './../components/floating-action-button/floating-action-button';
import { CheckboxComponent } from './../components/checkbox/checkbox';
import { RadioComponent } from './../components/radio/radio';
import { ListItemComponent } from '../components/list-item/list-item';
import { ButtonComponent } from '../components/button/button';

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
import { ProjectHistoryPage } from '../pages/project-history/project-history';
import { ScreenHistoryPage } from '../pages/screen-history/screen-history';

import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ScreenProvider } from '../providers/screen/screen';
import { ProjectProvider } from '../providers/project/project';
import { LongPressModule } from 'ionic-long-press';
import { AlertProvider } from '../providers/alert/alert';
import { ReplaceComponentPage } from '../pages/replace-component/replace-component';

import { environment } from './../environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ProjectSettingsPage } from '../pages/project-settings/project-settings';
import { HttpModule } from '@angular/http';
import { IonicImageLoader } from 'ionic-image-loader';
import { JsonProvider } from '../providers/json/json';
import { Toast } from '@ionic-native/toast';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ProjectPage,
    ProjectHistoryPage,
    ProjectSettingsPage,
    TargetPlatformPage,
    ReviewComponentsPage,
    ScreenTabsPage,
    ScreenPreviewPage,
    ScreenBuildPage,
    ScreenInspectPage,
    ScreenHistoryPage,
    InspectorPage,
    EditComponentPage,
    ReplaceComponentPage,
    FullscreenPage,
    HeaderWithMenuComponent,
    HeaderWithBackComponent,
    ImageComponent,
    TextInputComponent,
    PasswordInputComponent,
    FloatingActionButtonComponent,
    CheckboxComponent,
    RadioComponent,
    ListItemComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LongPressModule,
    HttpModule,
    IonicImageLoader.forRoot(),
    SocketIoModule.forRoot(config),
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
    ProjectSettingsPage,
    TargetPlatformPage,
    ReviewComponentsPage,
    ScreenTabsPage,
    ScreenPreviewPage,
    ScreenBuildPage,
    ScreenInspectPage,
    ScreenHistoryPage,
    InspectorPage,
    EditComponentPage,
    ReplaceComponentPage,
    FullscreenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Facebook,
    File,
    FilePath,
    ImagePicker,
    NativeStorage,
    ScreenProvider,
    ProjectProvider,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    JsonProvider
  ]
})
export class AppModule {}
