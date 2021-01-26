import React, {Component} from 'react';
import Contact from './src/screens/Cotact';
import Login from './src/screens/Login';
import Videocall from './src/screens/Videocall';
import Signup from './src/screens/Signup';
import Start from './src/screens/Start';
import Vendor from './src/screens/Vendor';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
const DrawerNavigation = createDrawerNavigator({
  Start: Start,
  Contact: Contact,
  Login: Login,
  Vendor: Vendor,
  Videocall: Videocall,
  Signup: Signup,
}); // 추후에 왼쪽 NAV바 만들때 사용

var StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation,
    },
    Vendor: Vendor,
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

interface Props {
  navigation: any;
}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
// interface state {
//   appId: string;
//   token: string;
//   channelName: string;
//   joinSucceed: boolean;
//   peerIds: number[];
//   fcmToken: string;
//   name: string;
//   topic: string;
// }

export default class App extends Component<Props> {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     appId: `17a05d44fa594610ad070bdbfee9594d`,
  //     token: ``,
  //     channelName: 'videoCall',
  //     joinSucceed: false,
  //     peerIds: [],
  //     fcmToken: ``,
  //     name: 'sungMin',
  //     topic: 'string',
  //   };
  // }

  async componentDidMount() {
    this._checkPermission();
    this._listenForNotifications();
  }

  componentWillUnmount() {
    this.notificationOpenedListener();
  }

  async _checkPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      // user has permissions
      console.log(enabled);
      // this._updateTokenToServer();
    } else {
      // user doesn't have permission
      this._requestPermission();
    }
  }

  async _requestPermission() {
    try {
      // User has authorised
      await messaging().requestPermission();
      // await this._updateTokenToServer();
    } catch (error) {
      // User has rejected permissions
      Alert.alert("you can't handle push notification");
    }
  }

  // async _updateTokenToServer() {
  //   const fcmToken = await messaging().getToken();
  //   console.log(fcmToken);

  //   const header = {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       Cache: 'no-cache',
  //     },
  //     body: JSON.stringify({
  //       user_id: 'CURRENT_USER_ID',
  //       firebase_token: fcmToken,
  //     }),
  //     credentials: 'include',
  //   };
  //   const url = 'http://YOUR_SERVER_URL';

  //   // if you want to notification using server,
  //   // do registry current user token

  //   // await fetch(url, header);
  // }
  notificationOpenedListener = messaging().onNotificationOpenedApp(
    notificationOpen => {
      console.log('onNotificationOpened', notificationOpen);
      StackNavigation = createStackNavigator(
        {
          DrawerNavigation: {
            screen: DrawerNavigation,
          },
          Contact: Contact,
          Login: Login,
          Videocall: Videocall,
          Signup: Signup,
          Start: Start,
          Vendor: Vendor,
        },
        {
          headerMode: 'none',
        },
      );
    },
  );

  async _listenForNotifications() {
    messaging().onNotificationOpenedApp(notificationOpen => {
      console.log('onNotificationOpened', notificationOpen);
      StackNavigation = createStackNavigator(
        {
          DrawerNavigation: {
            screen: DrawerNavigation,
          },
          Contact: Contact,
          Login: Login,
          Videocall: Videocall,
          Signup: Signup,
          Start: Start,
          Vendor: Vendor,
        },
        {
          headerMode: 'none',
        },
      );
    });

    const notificationOpen = await messaging().getInitialNotification();
    if (notificationOpen) {
      console.log('getInitialNotification', notificationOpen);
    }
  }

  render() {
    const AppContainer = createAppContainer(StackNavigation);

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
