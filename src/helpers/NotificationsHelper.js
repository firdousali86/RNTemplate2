import {Alert, Platform} from 'react-native';
import utils from '../util';
import {Actions} from 'react-native-router-flux';
// import RNFirebase, {
//   Notification,
//   NotificationOpen,
//   RemoteMessage
// } from 'react-native-firebase';
import messaging from '@react-native-firebase/messaging';

// const configurationOptions = {
//   debug: true,
//   promptOnMissingPlayServices: true,
// };

class NotificationsHelper {
  getToken = () => {
    messaging()
      .getToken()
      .then((token) => {
        console.log(token);
        // return saveTokenToDatabase(token);
      });
  };

  refreshToken = () => {
    messaging().onTokenRefresh((token) => {
      console.log(token);
      // saveTokenToDatabase(token);
    });
  };

  initializeFCM = () => {
    // this.firebase = RNFirebase.initializeApp(configurationOptions);

    // this.notificationDisplayedListener = RNFirebase.notifications().onNotificationDisplayed(
    //   (notification: Notification) => {
    //     console.log('A');

    //     this.dataAndMessageReceiveHandler(notification);

    //     // Process your notification as required
    //     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    //   },
    // );
    // this.notificationListener = RNFirebase.notifications().onNotification(
    //   (notification: Notification) => {
    //     console.log('B');
    //     // Process your notification as required
    //     if (Platform.OS === 'android') {
    //       const localNotification = new RNFirebase.notifications.Notification({
    //         sound: 'default',
    //         show_in_foreground: true,
    //       })
    //         .setNotificationId(notification.notificationId)
    //         .setTitle(notification.title)
    //         .setSubtitle(notification.subtitle)
    //         .setBody(notification.body)
    //         .setData(notification.data)
    //         .android.setChannelId('channelId') // e.g. the id you chose above
    //         .android.setColor('#000000') // you can set a color here
    //         .android.setPriority(
    //           RNFirebase.notifications.Android.Priority.High,
    //         );

    //       RNFirebase.notifications()
    //         .displayNotification(localNotification)
    //         .catch((err) => {});
    //     } else if (Platform.OS === 'ios') {
    //       const localNotification = new RNFirebase.notifications.Notification()
    //         .setNotificationId(notification.notificationId)
    //         .setTitle(notification.title)
    //         .setSubtitle(notification.subtitle)
    //         .setBody(notification.body)
    //         .setData(notification.data)
    //         .ios.setBadge(notification.ios.badge);

    //       RNFirebase.notifications()
    //         .displayNotification(localNotification)
    //         .catch((err) => {});
    //     }
    //   },
    // );
    // this.notificationOpenedListener = RNFirebase.notifications().onNotificationOpened(
    //   (notificationOpen: NotificationOpen) => {
    //     console.log('C');
    //     // Get the action triggered by the notification being opened
    //     const action = notificationOpen.action;
    //     // Get information about the notification that was opened
    //     const notification: Notification = notificationOpen.notification;

    //     const data = notification.data;
    //     if (data) {
    //       if (data.notificationType === 'order') {
    //         if (data.userType && data.userType === 'vendor') {
    //           Actions.orderDetails({orderId: data.orderId});
    //         } else if (data.userType === 'customer') {
    //           Actions.custOrderDetails({orderId: data.orderId});
    //         }
    //       } else if (data.notificationType === 'itemRequest') {
    //         Actions.manageStores();
    //       }
    //     }
    //   },
    // );
    // this.messageListener = RNFirebase.messaging().onMessage(
    //   (message: RemoteMessage) => {
    //     // Process your message as required
    //     console.log('E');

    //     this.dataAndMessageReceiveHandler(message);
    //   },
    // );
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
      // navigation.navigate(remoteMessage.data.type);
    });
  };

  /*
  The value returned is a number value, which can be mapped to one of the following values from messaging.AuthorizationStatus:
    -1 = messaging.AuthorizationStatus.NOT_DETERMINED: Permission has not yet been requested for your application.
    0 = messaging.AuthorizationStatus.DENIED: The user has denied notification permissions.
    1 = messaging.AuthorizationStatus.AUTHORIZED: The user has accept the permission & it is enabled.
    2 = messaging.AuthorizationStatus.PROVISIONAL: Provisional authorization has been granted.
  */

  checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  };

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

    // RNFirebase.messaging()
    //   .hasPermission()
    //   .then((enabled) => {
    //     if (enabled) {
    //       // user has permissions
    //       console.log('LOG: USER HAS PERMISSIONS');
    //     } else {
    //       // user doesn't have permission
    //       console.log('LOG: USER DOES NOT HAVE PERMISSIONS');

    //       RNFirebase.messaging()
    //         .requestPermission()
    //         .then(() => {
    //           // User has authorised
    //           console.log('LOG: USER HAVE AUTHORISED');
    //         })
    //         .catch((error) => {
    //           // User has rejected permissions
    //           console.log('LOG: USER HAS REJECTED PERMISSIONS');
    //         });
    //     }
    //   });
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
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });

    // RNFirebase.notifications()
    //   .getInitialNotification()
    //   .then((notificationOpen: NotificationOpen) => {
    //     console.log('D');
    //     if (notificationOpen) {
    //       // App was opened by a notification
    //       // Get the action triggered by the notification being opened
    //       const action = notificationOpen.action;
    //       // Get information about the notification that was opened
    //       const notification: Notification = notificationOpen.notification;
    //     }
    //   });
  };

  appMount = () => {
    // const channel = new RNFirebase.notifications.Android.Channel(
    //   'channelId',
    //   'Channel Name',
    //   RNFirebase.notifications.Android.Importance.Max,
    // ).setDescription('A natural description of the channel');

    // RNFirebase.notifications().android.createChannel(channel);

    this.initializeFCM();
    this.checkFCMPermission();
    this.getInitialNotification();
  };

  unMount = () => {
    // this.notificationDisplayedListener();
    // this.notificationListener();
    // this.notificationOpenedListener();
    this.messageListener();
  };

  dataAndMessageReceiveHandler = (notification) => {
    const data = notification.data;

    console.log(data);
  };
}

export default new NotificationsHelper();
