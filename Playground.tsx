import {useEffect} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }

    return enabled;
  };

  useEffect(() => {
    (async () => {
      const permitted = await requestUserPermission();
      if (permitted) {
        messaging()
          .getToken()
          .then(token => {
            console.log({token});
          });
      } else {
        console.error('Permission denied!');
      }

      messaging()
        .getInitialNotification()
        .then(async remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });

      messaging().onNotificationOpenedApp(async remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      // Subscription to a topic for fan-out message
      // messaging().subscribeToTopic('test').then((res) => console.log({ res })).catch(console.error)

      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background', remoteMessage);
      });
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });

      return unsubscribe;
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
