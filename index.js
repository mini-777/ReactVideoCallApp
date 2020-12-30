/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import axios from 'axios';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  remoteMessage.data
});

AppRegistry.registerComponent(appName, () => App);
