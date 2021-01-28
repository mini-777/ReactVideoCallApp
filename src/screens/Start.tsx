import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

function Start({navigation}) {
  useEffect(() => {
    _checkPermission();
    _listenForNotifications();

    return function cleanup() {
      notificationOpenedListener();
    };
  });
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
      Alert.alert("you can't handle push notification");
    }
  };

  const notificationOpenedListener = messaging().onNotificationOpenedApp(
    notificationOpen => {
      console.log('onNotificationOpened', notificationOpen);
    },
  );

  const _listenForNotifications = async () => {
    messaging().onNotificationOpenedApp(notificationOpen => {
      console.log('onNotificationOpened', notificationOpen);
    });

    const notificationOpen = await messaging().getInitialNotification();
    if (notificationOpen) {
      console.log('getInitialNotification', notificationOpen);
      navigation.navigate('Vendor', notificationOpen);
    }
  };

  return (
    <View style={styles.rect}>
      <StatusBar hidden />
      <View style={styles.자동차문의는무진콜Column}>
        <Text style={styles.자동차문의는무진콜}>자동차 문의는{'\n'}무진</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Signup', {name: 'Custom profile header'})
          }
          style={styles.button}>
          <Text style={styles.계정생성하기}>계정 생성하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.자동차문의는무진콜ColumnFiller} />
      <View style={styles.rect2}>
        <TouchableOpacity onPress={() => navigation.navigate('Vendor')}>
          <Text style={styles.이미계정이있으신가요}>
            이미 계정이 있으신가요?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: 'rgba(21,31,40,1)',
  },
  자동차문의는무진콜: {
    color: 'rgba(255,255,255,1)',
    fontSize: 45,
    lineHeight: 50,
    textAlign: 'left',
    marginLeft: 3,
    marginRight: 2,
  },
  button: {
    height: 81,
    backgroundColor: 'rgba(29,161,242,1)',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 120,
  },
  계정생성하기: {
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    alignSelf: 'center',
  },
  자동차문의는무진콜Column: {
    marginTop: 233,
    marginLeft: 31,
    marginRight: 31,
  },
  자동차문의는무진콜ColumnFiller: {
    flex: 1,
  },
  rect2: {
    height: 39,
    marginBottom: 45,
    marginLeft: 28,
    marginRight: 28,
  },
  이미계정이있으신가요: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    marginTop: 13,
  },
});

export default Start;
