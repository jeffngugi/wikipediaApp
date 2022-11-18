import {StyleSheet, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const WebViewScreen = ({route}) => {
  const {item} = route.params;
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <WebView source={{uri: item.url}} containerStyle={styles.webView} />
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});
