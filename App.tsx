import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WebViewScreen from './WebViewScreen';
import {
  getFcmToken,
  requestUserPermission,
  notificationListener,
} from './notifications';
const Stack = createNativeStackNavigator();

const App = () => {
  const [generatedToken, setGeneratedToken] = useState<any>();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getFcmToken();
      if (token) {
        setGeneratedToken(token);
      }
    };
    // const fetchTokenByLocal = async () => {
    //   await getFcmTokenFromLocalStorage();
    // };
    void fetchToken();
    void requestUserPermission();
    void notificationListener();
  }, []);
  console.log('generatedToken', generatedToken);
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen name="webview" component={WebViewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
