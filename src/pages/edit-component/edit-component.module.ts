import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditComponentPage } from './edit-component';
import { IonicImageLoader } from 'ionic-image-loader';
@NgModule({
  declarations: [
    EditComponentPage,
  ],
  imports: [
    IonicImageLoader,
    IonicPageModule.forChild(EditComponentPage),
  ],
})
export class EditComponentPageModule {}
