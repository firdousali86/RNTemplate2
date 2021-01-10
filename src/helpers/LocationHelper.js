// import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import {Platform, Linking} from 'react-native';

import {request, PERMISSIONS, check, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import geolib from 'geolib';
// import MapboxDirectionsFactory from "@mapbox/mapbox-sdk/services/directions";

// import KDBush from "kdbush";
// import geokdbush from "geokdbush";

import Util from '../util';

let location = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

class LocationHelper {
  // locationTrackingUnSub = undefined;
  geoLocationWatchId = undefined;
  isFetching = false;

  getLocation() {
    return {...location};
  }

  getLocationAndDelta() {
    return {
      ...location,
      latitudeDelta: 0.000044915558749550845,
      longitudeDelta: 0.000056490434918185467,
    };
  }

  getProvidedLocationWithDelta = providedLocation => {
    return {
      ...providedLocation,
      latitudeDelta: 0.000044915558749550845,
      longitudeDelta: 0.000056490434918185467,
    };
  };

  setLocation = locationCoords => {
    location = {
      ...locationCoords,
    };
  };

  checkLocationPermission = (
    isHighAccuracy,
    successCallback,
    errorCallback,
  ) => {
    check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            this.requestPermission(successCallback, errorCallback);
            break;
          case RESULTS.DENIED:
            this.requestPermission(successCallback, errorCallback);
            break;
          case RESULTS.GRANTED:
            successCallback();
            break;
          case RESULTS.BLOCKED:
            this.requestPermission(successCallback, errorCallback);
            break;
        }
      })
      .catch(error => {
        errorCallback();
      });
  };

  requestPermission = (successCallback, errorCallback) => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(result => {
        if (successCallback) successCallback();
      })
      .catch(error => {
        if (errorCallback) errorCallback(error);
      });
  };

  // forceAskPermission = (successCallback, errorCallback) => {
  //   LocationServicesDialogBox.checkLocationServicesIsEnabled({
  //     message:
  //       "<h2>Use Location ?</h2>Mangwalo wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
  //     ok: "YES",
  //     cancel: "NO",
  //     enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
  //     showDialog: true, // false => Opens the Location access page directly
  //     openLocationServices: true, // false => Directly catch method is called if location services are turned off
  //     preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
  //     preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
  //     providerListener: true // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
  //   })
  //     .then(
  //       function(success) {
  //         successCallback();
  //       }.bind(this)
  //     )
  //     .catch(error => {
  //       errorCallback(error);
  //     });
  // };

  updateLocation(doAskPermission, callback, errorCallBack) {
    if (Util.isPlatformAndroid()) {
      if (doAskPermission) {
        this.checkLocationPermission(
          false,
          () => {
            this.getLocationGeneral(callback, errorCallBack);
          },
          error => {
            consoleLog(error.message);
          },
        );
      } else {
        this.getLocationGeneral(callback, errorCallBack);
      }
    } else {
      this.getLocationGeneral(callback, errorCallBack);
    }
  }

  startLocationTracking = (doAskPermission, callback, errorCallBack) => {
    if (Util.isPlatformAndroid()) {
      if (doAskPermission) {
        this.checkLocationPermission(
          true,
          () => {
            this.getLocationTracking(callback, errorCallBack);
          },
          error => {
            consoleLog(error.message);
          },
        );
      } else {
        this.getLocationTracking(callback, errorCallBack);
      }
    } else {
      this.getLocationTracking(callback, errorCallBack);
    }

    // const ispermitted = RNLocation.checkPermission({
    //   ios: "always", // or 'always'
    //   android: {
    //     detail: "fine" // or 'fine'
    //   }
    // });

    // if (!ispermitted) {
    //   RNLocation.requestPermission({
    //     ios: "always", // or 'always'
    //     android: {
    //       detail: "fine", // or 'fine'
    //       rationale: {
    //         title: "We need to access your location",
    //         message: "We use your location to show where you are on the map",
    //         buttonPositive: "OK",
    //         buttonNegative: "Cancel"
    //       }
    //     }
    //   });
    // } else {
    //   this.getLocationTracking(callback, errorCallBack);
    // }
  };

  getLocationTracking = (callback, errorCallback) => {
    Geolocation.watchPosition(
      position => {
        const locationObject = {
          ...position.coords,
          timestamp: position.timestamp,
          mocked: position.mocked,
        };

        this.setLocation(locationObject);

        if (callback) {
          callback(locationObject);
        }
      },
      error => {
        // See error code charts below.
        if (errorCallback) {
          errorCallback(error);
        } else {
          this.onLocationFailure();
        }
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 5,
        interval: 2000, // Milliseconds
        fastestInterval: 1000, // Milliseconds
        showLocationDialog: true,
        forceRequestLocation: true,
        useSignificantChanges: true,
      },
    );

    // RNLocation.configure({
    //   distanceFilter: 0.5, // Meters
    //   desiredAccuracy: {
    //     ios: "best",
    //     android: "balancedPowerAccuracy"
    //   },
    //   // Android only
    //   androidProvider: "auto",
    //   interval: 10, // Milliseconds
    //   fastestInterval: 10, // Milliseconds
    //   maxWaitTime: 50, // Milliseconds
    //   // iOS Only
    //   activityType: "other",
    //   allowsBackgroundLocationUpdates: false,
    //   headingFilter: 1, // Degrees
    //   headingOrientation: "portrait",
    //   pausesLocationUpdatesAutomatically: false,
    //   showsBackgroundLocationIndicator: false
    // });

    // locationTrackingUnSub = RNLocation.subscribeToLocationUpdates(locations => {
    //   if (callback) {
    //     this.setLocation(locations[0]);
    //     callback(locations[0]);
    //   }
    // });
  };

  getLocationGeneral = (callback, errorCallBack) => {
    Geolocation.getCurrentPosition(
      position => {
        const locationObject = {
          ...position.coords,
          timestamp: position.timestamp,
          mocked: position.mocked,
        };

        this.setLocation(locationObject);

        if (callback) {
          callback(locationObject);
        }
      },
      error => {
        // See error code charts below.
        if (errorCallBack) {
          errorCallBack(error);
        } else {
          this.onLocationFailure();
        }
      },
      {
        showLocationDialog: true,
        forceRequestLocation: true,
        distanceFilter: 0.5,
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000,
      },
    );

    // RNLocation.configure({
    //   distanceFilter: 0.5, // Meters
    //   desiredAccuracy: {
    //     ios: "best",
    //     android: "balancedPowerAccuracy"
    //   },
    //   // Android only
    //   androidProvider: "auto",
    //   // iOS Only
    //   activityType: "other"
    // });

    // RNLocation.getLatestLocation({ timeout: 60000 })
    //   .then(position => {
    //     const location = {
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude
    //     };

    //     this.setLocation(location);

    //     if (callback) {
    //       callback(location);
    //     }
    //   })
    //   .catch(ex => {
    //     if (errorCallBack) {
    //       errorCallBack();
    //     } else {
    //       this.onLocationFailure();
    //     }
    //   });
  };

  onLocationFailure = () => {
    Util.showAlertWithDelay('Alert', 'Please enable Location permission');
  };

  stopListener() {
    if (Util.isPlatformAndroid()) {
      // LocationServicesDialogBox.stopListener();
    }

    Geolocation.stopObserving();

    if (this.geoLocationWatchId) {
      Geolocation.clearWatch(this.geoLocationWatchId);
    }

    // if (locationTrackingUnSub) {
    //   locationTrackingUnSub();
    // }
  }

  // getRouteFromDirectionClient = async (
  //   fromCoord,
  //   toCoord,
  //   successCallback,
  //   failureCallback
  // ) => {
  //   if (!this.isFetching) {
  //     this.isFetching = true;

  //     const reqOptions = {
  //       waypoints: [
  //         { coordinates: [fromCoord.longitude, fromCoord.latitude] },
  //         { coordinates: [toCoord.longitude, toCoord.latitude] }
  //       ],
  //       profile: "walking",
  //       geometries: "geojson"
  //     };

  //     const clientOptions = {
  //       accessToken:
  //         "pk.eyJ1Ijoic3RyZWV0bWFuY2hvbXBjaG9tcCIsImEiOiJja2F4cTB2cmIwOGt6MndvMmFod2gydWY5In0.xjcrWsNIWVjFQc1hAZAlZA"
  //     };
  //     const directionsClient = MapboxDirectionsFactory(clientOptions);

  //     try {
  //       const res = await directionsClient.getDirections(reqOptions).send();

  //       const pathArray = res.body.routes[0].geometry.coordinates;

  //       if (successCallback && pathArray && pathArray.length > 0) {
  //         this.isFetching = false;

  //         successCallback(res.body.routes[0].geometry.coordinates);
  //       } else {
  //         this.isFetching = false;

  //         if (failureCallback) {
  //           failureCallback("No path found");
  //         }

  //         Util.showAlertWithDelay("Get Directions failed", "No path found");
  //       }
  //     } catch (ex) {
  //       this.isFetching = false;

  //       if (failureCallback) {
  //         failureCallback(ex);
  //       }

  //       Util.showAlertWithDelay("Get Directions failed", ex);
  //     }
  //   }
  // };

  // calculateSearchIndex = dataset => {
  //   if (dataset && Array.isArray(dataset) && dataset.length > 0) {
  //     const index = new KDBush(
  //       dataset,
  //       p => p.coordinates.longitude,
  //       p => p.coordinates.latitude
  //     );

  //     return index;
  //   }

  //   return undefined;
  // };

  // getNearest = async (index, lat, long, radius, maxResults = 1000) => {
  //   try {
  //     // return await geokdbush.around(index, long, lat, 10, radius + 200);
  //     return await geokdbush.around(index, long, lat, maxResults, radius);
  //   } catch (error) {
  //     return [];
  //   }
  // };

  calculateDistance(lat2, lon2) {
    const {latitude: lat1, longitude: lon1} = location;

    if (!lat1 || !lon1 || !lat2 || !lon2) {
      return undefined;
    }

    let distance = geolib.getDistance(
      {latitude: lat1, longitude: lon1},
      {latitude: lat2, longitude: lon2},
    );
    distance = distance / 1000;
    return distance.toFixed(1);
  }

  openGoogleMapsApplication = (lat, lng, label = '') => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${lat},${lng}`;

    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  openDirectionsApplication = (lat, lng) => {
    Platform.select({
      ios: () => {
        Linking.openURL('http://maps.apple.com/maps?daddr=' + lat + ',' + lng);
      },
      android: () => {
        Linking.openURL('http://maps.google.com/maps?daddr=' + lat + ',' + lng);
      },
    })();
  };
}

export default new LocationHelper();
