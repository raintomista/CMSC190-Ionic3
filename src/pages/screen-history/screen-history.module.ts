import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenHistoryPage } from './screen-history';

@NgModule({
  declarations: [
    ScreenHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenHistoryPage),
  ],
})
export class ScreenHistoryPageModule {}
