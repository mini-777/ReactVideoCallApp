import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Divider from '../components/Divider';
import axios from 'axios';
import {firebase} from '@react-native-firebase/messaging';
import BASE_URL from '../settings/URL';


function SignupForm({navigation, route}) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [authNum, setAuthNum] = useState('');
  const [authInput, setAuthInput] = useState('');
  const [phoneAuth, setPhoneAuth] = useState(false);

  useEffect(() => {
    fcmTokenGen();
  }, []);

  const fcmTokenGen = async () => {
    const fcm = await firebase.messaging().getToken();
    setToken(fcm);
  };

  const sendAuth = async () => {
    if (!phoneNum) {
      Alert.alert('휴대폰 번호를 입력해 주세요');
      return;
    }
    var randNum = Math.floor(Math.random() * 10000) + 1000;
    if (randNum > 10000) {
      randNum = randNum - 10000;
    }
    setAuthNum(randNum.toString());
    await axios
      .post(BASE_URL + '3001/sendsms', {
        phoneNum: phoneNum,
        authNum: randNum.toString(),
      })
      .then(() => Alert.alert('인증번호가 전송되었습니다 !'));
  };
  const handleSignUp = () => {
    if (!name) {
      Alert.alert('이름을 입력해주세요');
      return;
    }
    if (name.length <= 1) {
      Alert.alert('이름 두자이상 입력해주세요');
      return;
    }
    if (!email) {
      Alert.alert('이메일을 입력해주세요');
      return;
    }
    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      Alert.alert('올바른 이메일 양식을 입력하세요');
      return;
    }
    if (!password) {
      Alert.alert('비밀번호를 입력하세요');
      return;
    }
    if (!phoneAuth) {
      Alert.alert('휴대폰 인증을 받으세요');
      return;
    }
    navigation.navigate('MyModal', {
      token: token,
      email: email,
      password: password,
      phoneNum: phoneNum,
      name: name,
    });

  };
  const phoneRegister = () => {
    if (authNum === authInput && authInput) {
      setPhoneAuth(true);
      Alert.alert('인증되었습니다 !');
    } else if (!authInput) {
      setPhoneAuth(false);
      Alert.alert('인증번호를 입력하지 않으셨습니다');
    } else {
      setPhoneAuth(false);
      Alert.alert('틀렸습니다 !');
    }
  };
  return (
    <View style={styles.frame}>
      <Text style={styles.registerText}>계정을 생성하세요</Text>

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
        style={styles.input}
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
          style={styles.phoneNumInput}
          onChangeText={num => setPhoneNum(num)}
          maxLength={11}
          keyboardType="number-pad"
        />
        <TouchableOpacity onPress={sendAuth} style={styles.authRequestButton}>
          <Text style={styles.authButton}>인증번호 요청</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.olem}>
        <TextInput
          placeholder="인증번호"
          placeholderTextColor="rgba(120,135,147,1)"
          maxLength={4}
          keyboardType="number-pad"
          style={styles.authInput}
          onChangeText={num => setAuthInput(num)}
        />
        <TouchableOpacity
          onPress={phoneRegister}
          style={styles.authCheckButton}>
          <Text style={styles.authButton}>인증확인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupButtonFrame}>
        <Divider style={styles.divider} />
        <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
          <Text style={styles.signup}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#141f28',
    justifyContent: 'flex-end',
  },
  registerText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    lineHeight: 50,
    marginLeft: 30,
    marginBottom: 50,
  },
  textInputColumnFiller: {
    flex: 1,
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
  signupButtonFrame: {
    height: 65,
    width: 375,
    marginBottom: 40,
  },
  divider: {
    width: 360,
    height: 1,
  },
  signupButton: {
    width: 109,
    height: 50,
    backgroundColor: '#1da1f2',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 13,
    marginLeft: 240,
  },
  signup: {
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 30,
    alignSelf: 'center',
  },

  phoneNumInput: {
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
  authInput: {
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
  authCheckButton: {
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
  authRequestButton: {
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

export default SignupForm;
