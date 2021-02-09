import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setAnimating(true);
    _checkPermission();
    axios
      .get('http://3.34.124.138:8080/rtcToken?channelName=videoCall')
      .then(Response => {
        AsyncStorage.getItem('@user_id').then(async value => {
          if (value === 'vendor') {
            const message = await messaging().getInitialNotification();
            console.log(message);
            navigation.replace('Vendor', {
              fcmToken: Response.data.key,
              notification: message,
            });
          } else if (value === 'user') {
            navigation.replace('Contact', Response.data.key);
          } else {
            navigation.replace('Start', Response.data.key);
          }
        });
      })
      .catch(Error => {
        console.log(Error);
      });
    setAnimating(false);
    return function cleanup() {
      notificationOpenedListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  const _checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      // user has permissions
      console.log('FCM Permission Success');
      // this._updateTokenToServer();
    } else {
      // user doesn't have permission
      _requestPermission();
    }
  };

  const _requestPermission = async () => {
    try {
      // User has authorised
      await messaging().requestPermission();
      // await this._updateTokenToServer();
    } catch (error) {
      // User has rejected permissions
      Alert.alert('알림을 받을 수 없습니다');
    }
  };

  const notificationOpenedListener = messaging().onNotificationOpenedApp(
    notificationOpen => {
      console.log('onNotificationOpened', notificationOpen);
    },
  );

  // Set an initializing state whilst Firebase connects

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
