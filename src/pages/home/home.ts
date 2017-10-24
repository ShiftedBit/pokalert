import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GeolocationService } from '../../app/geolocation/geolocation.service';
import { BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coordinates: any[];
  backgroundCoordinates: any[];
  test: string;
  backgroundTrackingEnabled: boolean;

  constructor (public navCtrl: NavController,
              public geolocation: GeolocationService,
              private localNotifications: LocalNotifications) {
      
    this.coordinates = [];
    this.backgroundCoordinates = [];

    this.geolocation.locationWatcher.subscribe((data) => {
      if (data.coords && data.coords.latitude) {
        this.coordinates.push(data.coords);
      }
    })

    this.geolocation.backgroundLocationWatcher
    .subscribe((location: BackgroundGeolocationResponse) => {
  
      if (location) {
        this.backgroundCoordinates.push({
          latitude: location.latitude,
          longitude: location.longitude
        });
      }

      this.localNotifications.schedule({
        id: 1,
        title: "Legendary Pokemon found",
        text: location.latitude + ' ' + location.longitude
      });
  
      // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      this.geolocation.finishBackgroundPositionTrackingTask(); // FOR IOS ONLY
    });

  }

  public startWatching(): void {
    this.geolocation.startBackgroundPositionTracking();
  }

  public stopWatching(): void {
    this.geolocation.stopBackgroundPositionTracking();
  }

  public scheduleNotification(): void {
    this.localNotifications.schedule({
      id: 1,
      title: "Manually triggered Notification",
      text: "HUi",
      at: new Date(new Date().getTime()),
      led: 'FF0000',
      sound: null
    });
  }

  public updateBackgroundTracking(): void {
    if (this.backgroundTrackingEnabled) {
      this.geolocation.startBackgroundPositionTracking();
    } else {
      this.geolocation.stopBackgroundPositionTracking();
    }
  }

}
