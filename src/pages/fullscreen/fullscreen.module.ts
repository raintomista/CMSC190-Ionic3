import { ComponentsModule } from './../../components/components.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullscreenPage } from './fullscreen';

@NgModule({
  declarations: [
    FullscreenPage,
  ],
  imports: [
    IonicPageModule.forChild(FullscreenPage),
    ComponentsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class FullscreenPageModule {}
