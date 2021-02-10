import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../settings/URL';

function Contact({navigation, route}) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');

  const logout = () => {
    clearAll();
    navigation.replace('Start');
  };
  const sendMessage = () => {
    axios
      .post(BASE_URL + '3001/send', {
        token:
          'fGJG2mKdRYS0BPMtgtLZMk:APA91bHwtKbJF8o8KinjjpUGPMdCORM2OKPXf-bFDUwrMEcWn2kCoEzguZjAu5cl-sbsZ80tNPfal_8iE6-vdHltP09qXw7dpzcD0v_HAJ30U4XFikKaVlxrL0d3htHTsay6iNPYn1cS',
        title: title,
        subject: subject,
      })
      .then(() => console.log('Send it !!!'))
      .catch(err => {
        console.error(err);
      });
  };

  const startVideoCall = async () => {
    sendMessage();
    console.log(route);
    navigation.navigate('Videocall', route.params);
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log('Done.');
  };

  return (
    <View style={styles.frame}>
      <StatusBar hidden />
      <View style={styles.insideFrame}>
        <View
          style={[
            styles.container,
            navigation.style,
            styles.materialStackedLabelTextbox,
          ]}>
          <TextInput
            placeholder="제목"
            style={styles.inputStyle}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.materialUnderlineTextboxStack}>
          <View
            style={[
              styles.container,
              navigation.style,
              styles.materialUnderlineTextbox,
            ]}>
            <TextInput
              placeholder="상세 내용"
              style={styles.inputStyle}
              onChangeText={text => setSubject(text)}
            />
          </View>
          <TouchableOpacity
            onPress={startVideoCall}
            style={styles.contactButton}>
            <Text style={styles.contactText}>상담 신청</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#141f2b',
  },
  insideFrame: {
    width: 338,
    height: 562,
    backgroundColor: '#E6E6E6',
    borderRadius: 21,
    marginTop: 100,
    alignSelf: 'center',
  },
  materialStackedLabelTextbox: {
    height: 60,
    width: 284,
    marginTop: 70,
    alignSelf: 'center',
  },
  materialUnderlineTextbox: {
    height: 351,
    width: 297,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  contactButton: {
    marginTop: 10,
    top: 349,
    width: 284,
    height: 50,
    backgroundColor: '#1da1f2',
    position: 'absolute',
    borderRadius: 100,
    left: 7,
    justifyContent: 'center',
  },
  contactText: {
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 30,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 30,
    alignSelf: 'center',
  },
  materialUnderlineTextboxStack: {
    width: 297,
    height: 399,
    marginTop: 11,
    marginLeft: 20,
  },
  container: {
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
    backgroundColor: 'transparent',
  },
  inputStyle: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'stretch',
    flex: 1,
    lineHeight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  logoutButton: {
    width: 109,
    height: 50,
    backgroundColor: '#1da1f2',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 240,
  },
});

export default Contact;
