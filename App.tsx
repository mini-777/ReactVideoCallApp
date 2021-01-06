import React, {Component} from 'react';
import {
  Platform,
  PushNotificationIOS,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewBase,
  StatusBar,
  TextBase,
  Alert,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import messaging, {firebase} from '@react-native-firebase/messaging';
import requestCameraAndAudioPermission from './components/Permission';
import styles from './components/Style';
import axios from 'axios';
import Main from './src/screens/Main';
import Contact from './src/screens/Cotact';
import Login from './src/screens/Login';
import Videocall from './src/screens/Videocall';
import Signup from './src/screens/Signup';
import Start from './src/screens/Start';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const DrawerNavigation = createDrawerNavigator({
  Start: Start,
  Contact: Contact,
  Login: Login,
  Main: Main,
  Videocall: Videocall,
  Signup: Signup,
});

const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation,
    },
    Main: Main,
    Contact: Contact,
    Login: Login,
    Videocall: Videocall,
    Signup: Signup,
    Start: Start,
  },
  {
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(StackNavigation);

interface Props {
  navigation: any;
}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
interface state {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  peerIds: number[];
  fcmToken: string;
  name: string;
  topic: string;
}

export default class App extends Component<Props, state> {
  constructor(props) {
    super(props);
    this.state = {
      appId: `17a05d44fa594610ad070bdbfee9594d`,
      token: ``,
      channelName: 'videoCall',
      joinSucceed: false,
      peerIds: [],
      fcmToken: ``,
      name: 'sungMin',
      topic: 'string',
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }

  componentDidMount() {
    messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
  }
  componentDidUpdate() {}

  render() {
    return (
      <AppContainer />
      // <View style={styles.max}>
      //     <View style={styles.max}>
      //         <View style={styles.buttonHolder}>
      //             <TouchableOpacity
      //                 onPress={this.sendMessage}
      //                 style={styles.button}>
      //                 <Text style={styles.buttonText}> Start Call </Text>
      //             </TouchableOpacity>
      //             <TouchableOpacity
      //                 onPress={this.endCall}
      //                 style={styles.button}>
      //                 <Text style={styles.buttonText}> End Call </Text>
      //             </TouchableOpacity>
      //         </View>
      //         {this._renderVideos()}
      //     </View>
      // </View>
    );
  }
}
