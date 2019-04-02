import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// Angular
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// Ionic Native
import { Camera } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { ImagePicker } from '@ionic-native/image-picker';
import { NativeStorage } from '@ionic-native/native-storage';
import { Shake } from '@ionic-native/shake';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast';

// Libraries
import { IonicImageLoader } from 'ionic-image-loader';
import { LongPressModule } from 'ionic-long-press';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

// Page Module Imports
import { LoginPageModule } from '../pages/login/login.module';
import { HomePageModule } from '../pages/home/home.module';
import { ProjectPageModule } from '../pages/project/project.module';
import { ProjectHistoryPageModule } from '../pages/screen-history/screen-history.module';
import { ProjectSettingsPageModule } from '../pages/project-settings/project-settings.module';
import { TargetPlatformPageModule } from '../pages/target-platform/target-platform.module';
import { ReviewComponentsPageModule } from '../pages/review-components/review-components.module';
import { ScreenTabsPageModule } from '../pages/screen-tabs/screen-tabs.module';
import { InspectorPageModule } from '../pages/inspector/inspector.module';
import { EditComponentPageModule } from '../pages/edit-component/edit-component.module';
import { ReplaceComponentPageModule } from '../pages/replace-component/replace-component.module';
import { FullscreenPageModule } from '../pages/fullscreen/fullscreen.module';
import { TutorialPageModule } from '../pages/tutorial/tutorial.module';

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

// Providers
import { AlertProvider } from '../providers/alert/alert';
import { JsonProvider } from '../providers/json/json';
import { ProjectProvider } from '../providers/project/project';
import { ScreenProvider } from '../providers/screen/screen';
import { UserProvider } from '../providers/user/user';

// Environment
import { environment } from './../environments/environment';
import { ComponentsModule } from '../components/components.module';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LongPressModule,
    HttpModule,
    IonicImageLoader.forRoot(),
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp, {
    }),
    LoginPageModule,
    HomePageModule,
    ProjectPageModule,
    ProjectHistoryPageModule,
    ProjectSettingsPageModule,
    TargetPlatformPageModule,
    ReviewComponentsPageModule,
    ScreenTabsPageModule,
    InspectorPageModule,
    EditComponentPageModule,
    ReplaceComponentPageModule,
    FullscreenPageModule,
    TutorialPageModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
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
    Shake,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    JsonProvider,
    ProjectProvider,
    ScreenProvider,
    UserProvider
  ]
})
export class AppModule {}
