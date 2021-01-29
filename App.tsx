import React, {useEffect} from 'react';
import Contact from './src/screens/Cotact';
import Login from './src/screens/Login';
import Videocall from './src/screens/Videocall';
import Signup from './src/screens/Signup';
import Start from './src/screens/Start';
import Vendor from './src/screens/Vendor';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

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
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import Main from './src/screens/Main';

function App() {
  useEffect(() => {
    requestUserPermission();
  });

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  // useEffect(() => {
  //   _checkPermission();
  //   _listenForNotifications();

  //   return function cleanup() {
  //     notificationOpenedListener();
  //   };
  // });
  // const _checkPermission = async () => {
  //   const enabled = await messaging().hasPermission();
  //   if (enabled) {
  //     // user has permissions
  //     console.log('FCM Permission Success');
  //     // this._updateTokenToServer();
  //   } else {
  //     // user doesn't have permission
  //     _requestPermission();
  //   }
  // };

  // const _requestPermission = async () => {
  //   try {
  //     // User has authorised
  //     await messaging().requestPermission();
  //     // await this._updateTokenToServer();
  //   } catch (error) {
  //     // User has rejected permissions
  //     Alert.alert("you can't handle push notification");
  //   }
  // };

  // const notificationOpenedListener = messaging().onNotificationOpenedApp(
  //   notificationOpen => {
  //     console.log('onNotificationOpened', notificationOpen);
  //   },
  // );

  // const _listenForNotifications = async () => {
  //   messaging().onNotificationOpenedApp(notificationOpen => {
  //     console.log('onNotificationOpened', notificationOpen);
  //   });

  //   const notificationOpen = await messaging().getInitialNotification();
  //   if (notificationOpen) {
  //     console.log('getInitialNotification', notificationOpen);
  //     navigation.navigate('Vendor');
  //   }
  // };

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="videoCall"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1c2a38',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{
            title: '시작하기',
            headerStyle: {
              backgroundColor: 'rgba(21,31,40,1)',
            },
            headerTintColor: 'rgba(21,31,40,1)',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{title: '문의하기'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '로그인'}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{title: '회원가입'}}
        />
        <Stack.Screen name="Main" component={Main} options={{title: '메인'}} />
        <Stack.Screen
          name="Vendor"
          component={Vendor}
          options={{title: '고객 상담'}}
        />
        <Stack.Screen
          name="Videocall"
          component={Videocall}
          options={{title: '영상통화'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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
