import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html'
})
export class LoadingPage {

  constructor(public navCtrl: NavController, 
              public platform: Platform) {
      this.platform.ready().then(() => {
          this.navCtrl.setRoot(HomePage);
      })
  }

}
