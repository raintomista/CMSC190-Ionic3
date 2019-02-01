import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectSettingsPage } from './project-settings';

@NgModule({
  declarations: [
    ProjectSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectSettingsPage),
  ],
})
export class ProjectSettingsPageModule {}
