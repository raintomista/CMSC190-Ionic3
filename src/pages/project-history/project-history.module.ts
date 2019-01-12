import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectHistoryPage } from './project-history';

@NgModule({
  declarations: [
    ProjectHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectHistoryPage),
  ],
})
export class ProjectHistoryPageModule {}
