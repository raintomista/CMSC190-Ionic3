import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenTabsPage } from './screen-tabs';

@NgModule({
  declarations: [
    ScreenTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenTabsPage),
  ],
})
export class ScreenTabsPageModule {}
