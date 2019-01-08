import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenInspectPage } from './screen-inspect';

@NgModule({
  declarations: [
    ScreenInspectPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenInspectPage),
  ],
})
export class ScreenInspectPageModule {}
