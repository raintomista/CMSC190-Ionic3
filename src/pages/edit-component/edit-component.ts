import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-component',
  templateUrl: 'edit-component.html',
})
export class EditComponentPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

}
