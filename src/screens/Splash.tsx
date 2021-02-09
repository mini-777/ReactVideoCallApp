import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setAnimating(true);
    axios
      .get('http://3.34.124.138:8080/rtcToken?channelName=videoCall')
      .then(Response => {
        AsyncStorage.getItem('@user_id').then(value => {
          if (value === 'vendor') {
            navigation.replace('Vendor', Response.data.key);
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
