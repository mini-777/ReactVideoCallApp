import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import MaterialChipBasic from '../components/MaterialChipBasic';

function Vendor(props) {
  return (
    <View style={styles.rect}>
      <StatusBar hidden />
      <View style={styles.rect1}>
        <View style={styles.문의하기1Stack}>
          <Text style={styles.문의하기1} />
          <Text style={styles.문의하기2}>문의하기</Text>
        </View>
      </View>
      <MaterialChipBasic style={styles.materialChipBasic} />
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
