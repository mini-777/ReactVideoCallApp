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

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitPress = async () => {
    if (!email) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!password) {
      Alert.alert('Please fill Password');
      return;
    }
    setIsLoading(true);

    await axios
      .post('http://3.34.124.138:3001/login', {
        email: email,
        password: password,
      })
      .then(async Response => {
        if (Response.data.auth && Response.data.vendor) {
          await storeUserData('vendor');
          navigation.replace('Vendor');
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
      // saving error
      console.log(e);
    }
  };
  return (
    <View style={styles.rect}>
      <Loading loading={isLoading} />

      <Text style={styles.무진콜에로그인하세요}>무진에 로그인하세요</Text>
      <Text style={styles.id3}>이메일</Text>
      <Text style={styles.text4}>비밀번호</Text>
      <TextInput
        autoCapitalize="none"
        placeholder=""
        secureTextEntry={false}
        style={styles.textInput2}
        onChangeText={userEmail => setEmail(userEmail)}
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={Keyboard.dismiss}
      />
      <TextInput
        autoCapitalize="none"
        placeholder=""
        secureTextEntry={true}
        style={styles.textInput}
        onChangeText={UserPassword => setPassword(UserPassword)}
        keyboardType="default"
        onSubmitEditing={Keyboard.dismiss}
      />

      <View style={styles.무진콜에로그인하세요ColumnFiller} />
      <View style={styles.rect4}>
        <Divider style={styles.divider} />
        <TouchableOpacity onPress={handleSubmitPress} style={styles.button2}>
          <Text style={styles.로그인3}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: '#141f28',
  },
  무진콜에로그인하세요: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    lineHeight: 50,
    marginTop: 158,
    marginLeft: 17,
  },
  rect2: {
    height: 98,
    backgroundColor: '#1c2a38',
    marginTop: -168,
  },
  id3: {
    color: 'rgba(123,139,151,1)',
    fontSize: 16,
    lineHeight: 20,
    marginTop: 40,
    marginLeft: 18,
  },
  text4: {
    color: 'rgba(123,139,151,1)',
    fontSize: 18,
    lineHeight: 20,
    marginTop: 87,
    marginLeft: 17,
  },
  textInput: {
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
  text5: {
    color: '#7b8b97',
    fontSize: 18,
    lineHeight: 20,
    marginTop: 50,
    marginLeft: 82,
  },
  textInput2: {
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

  무진콜에로그인하세요ColumnFiller: {
    flex: 1,
  },
  rect4: {
    height: 91,
  },
  divider: {
    width: 360,
    height: 1,
  },
  button2: {
    width: 109,
    height: 50,
    backgroundColor: '#1da1f2',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 13,
    marginLeft: 240,
  },
  로그인3: {
    color: '#ffffff',
    fontSize: 24,
    lineHeight: 30,
    alignSelf: 'center',
  },
  로그인4: {
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    marginTop: 53,
    marginLeft: 31,
  },
});

export default Login;
