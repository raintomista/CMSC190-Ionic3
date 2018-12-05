import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProjectPage } from './../project/project';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  projects = [
    { name: 'Project 1', totalScreens: 10},
    { name: 'Project 2', totalScreens: 6},
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  viewProject(id) {
    this.navCtrl.push(ProjectPage, { id: id });
  }

  addProject() {

  }


}
