import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const [rtctoken, setToken] = useState('');

  useEffect(() => {
    axios
      .get('http://3.34.124.138:8080/rtcToken?channelName=videoCall')
      .then(Response => {
        setToken(Response.data.key);
        console.log('RTCtoken...', rtctoken);
      })
      .catch(Error => {
        console.log(Error);
      });
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('@user_id').then(value => {
        if (value === 'vendor') {
          navigation.replace('Vendor');
        } else if (value === 'user') {
          navigation.replace('Contact');
        } else {
          navigation.replace('Start');
        }
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

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
