import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import Divider from '../components/Divider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from './Loading';
import BASE_URL from '../settings/URL';

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPress = async () => {
    if (email == null) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!password) {
      Alert.alert('Please fill Password');
      return;
    }
    setIsLoading(true);
    await axios
      .post(`${BASE_URL}3001/login`, {
        email: email,
        password: password,
      })
      .then(async Response => {
        if (Response.data.auth && Response.data.vendor) {
          await storeUserData('vendor');
          navigation.replace('Vendor', {notification: null});
        } else if (Response.data.auth && !Response.data.vendor) {
          await storeUserData('user');
          navigation.replace('Contact');
        } else {
          Alert.alert('비밀번호나 이메일이 잘못되었습니다.');
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
    setIsLoading(false);
  };

  const storeUserData = async value => {
    try {
      await AsyncStorage.setItem('@user_id', value);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.frame}>
      <Loading loading={isLoading} />

      <Text style={styles.loginText}>무진에 로그인하세요</Text>
      <Text style={styles.emailText}>이메일</Text>
      <Text style={styles.passwordText}>비밀번호</Text>
      <TextInput
        autoCapitalize="none"
        placeholder=""
        secureTextEntry={false}
        style={styles.emailInput}
        onChangeText={userEmail => setEmail(userEmail)}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        autoCapitalize="none"
        placeholder=""
        secureTextEntry={true}
        style={styles.passwordInput}
        onChangeText={UserPassword => setPassword(UserPassword)}
        keyboardType="default"
        onSubmitEditing={Keyboard.dismiss}
      />

      <View style={styles.loginFrame} />
      <View style={styles.loginButtonForm}>
        <Divider style={styles.divider} />
        <TouchableOpacity
          onPress={handleSubmitPress}
          style={styles.loginButton}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: '#141f28',
  },
  loginText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    lineHeight: 50,
    marginTop: 158,
    marginLeft: 17,
  },
  emailText: {
    color: 'rgba(123,139,151,1)',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 40,
    marginLeft: 18,
  },
  passwordText: {
    color: 'rgba(123,139,151,1)',
    fontSize: 18,
    lineHeight: 20,
    marginTop: 87,
    marginLeft: 17,
  },
  passwordInput: {
    width: 300,
    height: 42,
    color: '#1da1f2',
    borderColor: 'rgba(123,139,151,1)',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: 70,
    marginLeft: 17,
  },
  emailInput: {
    width: 300,
    height: 42,
    color: '#1da1f2',
    borderColor: 'rgba(123,139,151,1)',
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: -110,
    marginLeft: 17,
  },

  loginFrame: {
    flex: 1,
  },
  loginButtonForm: {
    height: 91,
  },
  divider: {
    width: 360,
    height: 1,
  },
  loginButton: {
    width: 109,
    height: 50,
    backgroundColor: '#1da1f2',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 13,
    marginLeft: 240,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 30,
    alignSelf: 'center',
  },
});

export default Login;
