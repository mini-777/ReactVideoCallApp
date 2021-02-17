import React, {setState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';

function Start({navigation, route}) {
  return (
    <View style={styles.frame}>
      <StatusBar hidden />
      <View style={styles.signupButtonFrame}>
        <Text style={styles.titleText}>
          반갑습니다 {'\n'}
          {route.name}님 !
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup', route.params)}
          style={styles.signupButton}>
          <Text style={styles.subtitleText} />
        </TouchableOpacity>
      </View>
      <View style={styles.flexFrame} />
      <View style={styles.loginButtonFrame}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login', route.params)}>
          <Text style={styles.loginButtonText}>이미 계정이 있으신가요?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    backgroundColor: 'rgba(21,31,40,1)',
  },
  titleText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 45,
    lineHeight: 50,
    textAlign: 'left',
    marginLeft: 3,
    marginRight: 2,
  },
  signupButton: {
    height: 81,
    backgroundColor: 'rgba(29,161,242,1)',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 120,
  },
  subtitleText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    alignSelf: 'center',
  },
  signupButtonFrame: {
    marginTop: 233,
    marginLeft: 31,
    marginRight: 31,
  },
  flexFrame: {
    flex: 1,
  },
  loginButtonFrame: {
    height: 39,
    marginBottom: 45,
    marginLeft: 28,
    marginRight: 28,
  },
  loginButtonText: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    marginTop: 13,
  },
});

export default Start;
