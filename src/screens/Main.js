import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';

function Main(props) {
  return (
    <View style={styles.rect}>
      <StatusBar hidden />
      <View style={styles.자동차문의는무진콜Column}>
        <Text style={styles.자동차문의는무진콜}>
          {currentUser} 님 반갑습니다{' '}
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Contact')}
          style={styles.button}>
          <Text style={styles.계정생성하기}>문의 시작하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.자동차문의는무진콜ColumnFiller} />
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

export default Main;
