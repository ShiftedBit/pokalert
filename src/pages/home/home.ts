import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coordinates: any;
  test: string;

  constructor(public navCtrl: NavController,
              protected geoLocation: Geolocation,
              protected platform: Platform) {

      platform.ready().then(() => {
        this.initGeoloc();
      });
  }

  private initGeoloc() {

    let watchOptions = {
      enableHighAccuracy: true, 
      timeout: 20000, 
      maximumAge: 1200
    }

    let watch = this.geoLocation.watchPosition(watchOptions);
    watch.subscribe((data) => {
      if (data.coords && data.coords.latitude) {
        this.coordinates = data.coords;
      }
    });
  }

  public clicked() {
    console.log('hi');

    this.geoLocation.getCurrentPosition().then((data) => {
      console.log(data.coords);
    }).catch((err) => {
      console.log(err.message);
    })
  }
}
