import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

@Injectable()
export class GeolocationService {

    private positionConfig;
    private backgroundConfig: BackgroundGeolocationConfig;
    private _locationWatcher;
    private _backgroundLocationWatcher;
    
    constructor(protected geoLocation: Geolocation,
                protected backgroundGeolocation: BackgroundGeolocation) {
        this.init();
    }

    private init() {
        this.positionConfig = {
            enableHighAccuracy: true, 
            timeout: 20000, 
            maximumAge: 1200
        }

        this.backgroundConfig = {
            stationaryRadius: 50,
            distanceFilter: 50,
            desiredAccuracy: 10,
            debug: false,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            notificationIconColor: '#FEDD1E',
            notificationIconLarge: 'mappointer_large',
            notificationIconSmall: 'mappointer_small',
            locationProvider: 0,//backgroundGeolocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER,
            interval: 10,
            fastestInterval: 5,
            activitiesInterval: 10,
            stopOnTerminate: false,
            startOnBoot: false,
            startForeground: true,
            stopOnStillActivity: true,
            pauseLocationUpdates: false,
            saveBatteryOnBackground: false,
            maxLocations: 100
        };
    }

    public registerGeolocationWatcher() {
        this._locationWatcher = this.geoLocation.watchPosition(this.positionConfig);
    }

    public registerBackgroundGeolocationWatcher() {
        this._backgroundLocationWatcher = this.backgroundGeolocation.configure(this.backgroundConfig);
    }

    get backgroundLocationWatcher() {
        return this._backgroundLocationWatcher;
    }

    get locationWatcher() {

        /*
            watch.subscribe((data) => {
            if (data.coords && data.coords.latitude) {
                this.coordinates = data.coords;
            }
            });
        */

        return this._locationWatcher;
    }

    public startBackgroundPositionTracking() {
        this.backgroundGeolocation.start();
    }

    public finishBackgroundPositionTrackingTask() {
        this.backgroundGeolocation.finish();
        console.log('hehehe');
    }

    public stopBackgroundPositionTracking() {
        this.backgroundGeolocation.stop();
    }

}