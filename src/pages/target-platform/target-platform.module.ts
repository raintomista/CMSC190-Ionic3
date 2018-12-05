import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TargetPlatformPage } from './target-platform';

@NgModule({
  declarations: [
    TargetPlatformPage,
  ],
  imports: [
    IonicPageModule.forChild(TargetPlatformPage),
  ],
})
export class TargetPlatformPageModule {}
