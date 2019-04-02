import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenTabsPage } from './screen-tabs';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ScreenTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenTabsPage),
    ComponentsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class ScreenTabsPageModule {}
