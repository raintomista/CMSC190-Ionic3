import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  slides = [
    {
      title: "Welcome to drawtotype.io!",
      description: "This app will transform your <b>whiteboard drawings</b> into an <b>interactive prototype</b> in just a few seconds.",
      image: "assets/slides/slide-1.png",
    },
    {
      title: "Choose up to four components",
      description: "You can choose from <b>10 different kinds</b> of drawings which correspond to actual components.",
      image: "assets/slides/slide-2.png",
    },
    {
      title: " Draw vertically on a whiteboard",
      description: "Use a <b>thick whiteboard marker</b> and please make sure that there is <b>enough space</b> between each component.",
      image: "assets/slides/slide-3.png",
    },
    {
      title: "Close the gaps in your drawings",
      description: "The gaps in your drawings, <b>even a small one</b>, may affect the performance of the deep learning algorithm.",
      image: "assets/slides/slide-4.png",
    },
    {
      title: "Take a photo of your whiteboard",
      description: "Do it in a <b>well-lit room</b>  and please <b>avoid casting shadows</b> on your whiteboard drawings.",
      image: "assets/slides/slide-5.png",
    }
  ];

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  continue() {
    this.viewCtrl.dismiss();
    this.events.publish('tutorial_continue');
  }

  dismiss() {
    this.viewCtrl.dismiss();
    this.events.publish('tutorial_continue');
  }

}
