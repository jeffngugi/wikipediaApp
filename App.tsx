import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WebViewScreen from './WebViewScreen';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="webview"
            component={WebViewScreen}
            options={({route}) => ({title: route.params?.name ?? 'Title'})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;


