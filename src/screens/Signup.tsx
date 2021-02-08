import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Divider from '../components/Divider';
import {Value} from 'react-native-reanimated';
import axios from 'axios';
import Loading from './Loading';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {auth} from 'firebase-admin';
import {red} from 'chalk';

function Signup(props) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [authNum, setAuthNum] = useState('');
  const [authInput, setAuthInput] = useState('');
  const [phoneAuth, setPhoneAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fcmToken();
    console.log(token);
  }, [token]);
  const fcmToken = async () => {
    const fcm = await firebase.messaging().getToken();
    setToken(fcm);
  };

  const sendAuth = async () => {
    var result = (await Math.floor(Math.random() * 10000)) + 1000;
    if (result > 10000) {
      result = result - 10000;
    }
    setAuthNum(result.toString());

    await axios
      .post('http://3.34.124.138:3001/sendsms', {
        phoneNum: phoneNum,
        authNum: result.toString(),
      })
      .then(() => Alert.alert('인증번호가 전송되었습니다 !'));
  };
  const handleSignUp = () => {
    if (!name) {
      Alert.alert('이름을 입력해주세요');
    }
    if (!email) {
      Alert.alert('이메일을 입력해주세요');
      return;
    }
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      Alert.alert('올바른 이메일 양식을 입력하세요');
    }
    if (!password) {
      Alert.alert('비밀번호를 입력하세요');
      return;
    }
    if (!phoneAuth) {
      Alert.alert('휴대폰 인증을 받으세요');
      return;
    }
    Alert.alert('회원가입이 완료되었습니다.');
    setIsLoading(true);
    axios
      .post('http://3.35.8.116:3001/signup', {
        token,
        email,
        password,
        phoneNum,
        name,
      })
      .then(() => setIsLoading(false))
      .catch(err => {
        console.error(err);
      });
  };
  const phoneRegister = () => {
    if (authNum === authInput) {
      setPhoneAuth(true);
      Alert.alert('인증되었습니다 !');
    } else {
      setPhoneAuth(false);
      Alert.alert('틀렸습니다 !');
    }
  };
  return (
    <View style={styles.rect}>
      <Loading loading={isLoading} />
      <View style={styles.textInput2Column} />
      <View style={styles.textInputColumnFiller} />
      <Text style={styles.계정을생성하세요}>계정을 생성하세요</Text>
      <View style={styles.textInput2Column}>
        <TextInput
          placeholder="이름"
          autoCapitalize="none"
          secureTextEntry={false}
          style={styles.input}
          onChangeText={userName => setName(userName)}
          keyboardType="default"
          returnKeyType="next"
          placeholderTextColor="rgba(120,135,147,1)"
        />
        <TextInput
          placeholder="이메일"
          autoCapitalize="none"
          secureTextEntry={false}
          style={styles.email}
          onChangeText={userEmail => setEmail(userEmail)}
          keyboardType="email-address"
          returnKeyType="next"
          placeholderTextColor="rgba(120,135,147,1)"
        />
        <TextInput
          placeholder="비밀번호"
          placeholderTextColor="rgba(120,135,147,1)"
          secureTextEntry={true}
          style={styles.input}
          autoCapitalize="none"
          onChangeText={UserPassword => setPassword(UserPassword)}
          keyboardType="default"
        />
        <View style={styles.olem}>
          <TextInput
            placeholder="전화번호 ('-'빼고)"
            autoCapitalize="none"
            placeholderTextColor="rgba(120,135,147,1)"
            style={styles.textInput3}
            onChangeText={num => setPhoneNum(num)}
            maxLength={11}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={sendAuth} style={styles.textInput6}>
            <Text style={styles.authButton}>인증번호 요청</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.olem}>
          <TextInput
            placeholder="인증번호"
            placeholderTextColor="rgba(120,135,147,1)"
            maxLength={4}
            keyboardType="number-pad"
            style={styles.textInput4}
            onChangeText={num => setAuthInput(num)}
          />
          <TouchableOpacity onPress={phoneRegister} style={styles.textInput5}>
            <Text style={styles.authButton}>인증확인</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rect2}>
          <Divider style={styles.divider} />
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={styles.다음}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: '#141f28',
  },
  textInput: {
    width: 300,
    height: 42,
    color: '#1da1f2',
    borderColor: '#1da1f2',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: 36,
    marginBottom: 50,
    marginLeft: 36,
  },
  text2: {
    color: '#757575',
    fontSize: 18,
    lineHeight: 20,
    alignSelf: 'flex-end',
    marginTop: 12,
    marginRight: 1,
  },
  계정을생성하세요: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    lineHeight: 50,

    marginLeft: 30,
  },
  icon2: {
    color: '#1da1f2',
    fontSize: 35,
    marginTop: -143,
  },

  textInputColumnFiller: {
    flex: 1,
  },
  email: {
    width: 300,
    height: 42,
    color: '#1da1f2',
    borderColor: 'rgba(123,139,151,1)',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginLeft: 36,
  },
  input: {
    width: 300,
    height: 42,
    color: '#1da1f2',
    borderColor: 'rgba(123,139,151,1)',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 20,
    marginLeft: 36,
  },
  rect2: {
    height: 65,
    width: 375,
  },
  divider: {
    width: 360,
    height: 1,
  },
  button: {
    width: 109,
    height: 50,
    backgroundColor: '#1da1f2',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 13,
    marginLeft: 240,
  },
  다음: {
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 30,
    alignSelf: 'center',
  },
  textInput2Column: {
    marginBottom: 29,
    marginTop: 30,
  },
  login: {
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    marginLeft: 31,
    marginTop: 28,
  },
  textInput3: {
    width: 150,
    height: 42,
    color: '#1da1f2',
    borderColor: 'rgba(123,139,151,1)',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 50,
    marginLeft: 36,
  },
  textInput4: {
    width: 180,
    height: 42,
    color: '#1da1f2',
    borderColor: 'rgba(123,139,151,1)',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 50,
    marginLeft: 36,
  },
  textInput5: {
    color: '#1da1f2',
    borderColor: 'rgba(123,139,151,1)',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 20,
    width: 99,
    height: 40,
    backgroundColor: '#1da1f2',
    borderRadius: 100,
    justifyContent: 'center',
    marginLeft: 10,
  },
  textInput6: {
    color: '#1da1f2',
    borderColor: 'rgba(123,139,151,1)',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: 0,
    marginBottom: 20,
    width: 139,
    height: 40,
    backgroundColor: '#1da1f2',
    borderRadius: 100,
    justifyContent: 'center',
    marginLeft: 10,
  },
  olem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  authButton: {
    color: '#ffffff',
    fontSize: 18,
    lineHeight: 30,
    alignSelf: 'center',
  },
});

export default Signup;
