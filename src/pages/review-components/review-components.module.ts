import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewComponentsPage } from './review-components';

@NgModule({
  declarations: [
    ReviewComponentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewComponentsPage),
  ],
})
export class ReviewComponentsPageModule {}
