import {Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
const logo3 = require('./logo-chrome.json');
const logo2 = require('./logoanimation2.json');
const logo = require('./logoanimation.json');

const App2 = () => {
  return (
    <View>
      <Text>Jeff Ngugi</Text>
      <LottieView
        source={logo3}
        autoPlay
        loop
        style={{width: '80%'}}
        // colorFilters={[
        //   {
        //     keypath: 'button',
        //     color: 'red',
        //   },
        //   {
        //     keypath: 'Sending Loader',
        //     color: 'yellow',
        //   },
        // ]}
      />
    </View>
  );
};

export default App2;
