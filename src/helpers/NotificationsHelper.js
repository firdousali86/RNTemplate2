import {Alert, Platform} from 'react-native';
import utils from '../util';
import {Actions} from 'react-native-router-flux';
import messaging from '@react-native-firebase/messaging';

class NotificationsHelper {
  getToken = () => {
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
      });
  };

  refreshToken = () => {
    messaging().onTokenRefresh((token) => {
      console.log(token);
    });
  };

  initializeFCM = () => {
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      this.dataAndMessageReceiveHandler(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
  };

  /*
  The value returned is a number value, which can be mapped to one of the following values from messaging.AuthorizationStatus:
    -1 = messaging.AuthorizationStatus.NOT_DETERMINED: Permission has not yet been requested for your application.
    0 = messaging.AuthorizationStatus.DENIED: The user has denied notification permissions.
    1 = messaging.AuthorizationStatus.AUTHORIZED: The user has accept the permission & it is enabled.
    2 = messaging.AuthorizationStatus.PROVISIONAL: Provisional authorization has been granted.
  */

  checkFCMPermission = async () => {
    if (!utils.isPlatformAndroid()) {
      const authStatus = await messaging().requestPermission();

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
  };

  getInitialNotification = () => {
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };

  appMount = () => {
    this.initializeFCM();
    this.checkFCMPermission();
    this.getInitialNotification();
  };

  unMount = () => {
    this.messageListener();
  };

  dataAndMessageReceiveHandler = (notification) => {
    const data = notification.data;

    console.log(data);
  };
}

export default new NotificationsHelper();
