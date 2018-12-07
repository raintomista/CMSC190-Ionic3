import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenPreviewPage } from './screen-preview';

@NgModule({
  declarations: [
    ScreenPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenPreviewPage),
  ],
})
export class ScreenPreviewPageModule {}
