// @ts-ignore
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialChipBasic from '../components/MaterialChipBasic';
import Modal from 'react-native-simple-modal';
import messaging from '@react-native-firebase/messaging';
import styled from '../../components/Style';
import axios from 'axios';

function Vendor({route, navigation}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    axios
      .get('http://3.35.8.116:8080/rtcToken?channelName=videoCall')
      .then(Response => {
        setToken(Response.data.key);
        console.log('RTCtoken...', token);
      })
      .catch(Error => {
        console.log(Error);
      });
    if (route.params) {
      console.log(route)
      setTitle(route.params.notification.title);
      setSubject(route.params.notification.body);
      setOpen(true);
    }
    messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification?.title && remoteMessage.notification.body) {
        setTitle(remoteMessage.notification.title);
        setSubject(remoteMessage.notification.body);
        setOpen(true);
      }
    });
  }, []);

  return (
    <View style={styles.rect}>
      <StatusBar hidden />

      <MaterialChipBasic style={styles.materialChipBasic} />
      <Modal
        offset={0}
        open={open}
        modalDidOpen={() => console.log(title)}
        modalDidClose={() => setOpen(false)}>
        <Text style={styles.vendorText}>사용자의 문의가 도착했어요!</Text>
        <Text style={styles.vendorText}>{title}</Text>
        <Text style={styles.vendorText}>{subject}</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Videocall', token);
            setOpen(false)
          }}
          style={styled.button}>
          <Text style={styled.buttonText}> 수락 하기 </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOpen(false)} style={styled.button}>
          <Text style={styled.buttonText}> 거절 하기 </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: '#141f28',
  },
  rect1: {
    height: 84,
    backgroundColor: '#1c2a38',
  },
  문의하기1: {
    top: 14,
    left: 0,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 24,
  },
  문의하기2: {
    top: 0,
    left: 0,
    color: 'rgba(255,255,255,1)',
    position: 'absolute',
    fontSize: 24,
  },
  vendorText: {
    fontSize: 20,
    margin: 10,
  },
  문의하기1Stack: {
    width: 96,
    height: 32,
    marginTop: 26,
    marginLeft: 31,
  },
  materialChipBasic: {
    width: 249,
    height: 59,
    marginTop: 256,
    marginLeft: 56,
  },
});

export default Vendor;
