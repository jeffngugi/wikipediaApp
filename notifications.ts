import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

export const getFcmToken = async () => {
  try {
    const newFcmToken = await messaging().getToken();
    console.log('newFcmToken', newFcmToken);
    return newFcmToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Quiet and Background State -> Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    })
    .catch(error => console.log('failed', error));

  // Foreground State
  messaging().onMessage(async remoteMessage => {
    console.log('NewForegroundMesge', remoteMessage);
    Alert.alert(JSON.stringify(remoteMessage.notification?.body));
  });
};

// async function postNotificationTokenToApi(token) {
//   try {
//     await axios.post("/api/users/notification-token", {
//       notificationToken: token
//     });
//   } catch (error) {
//     console.log("error", error);
//   }
// }
