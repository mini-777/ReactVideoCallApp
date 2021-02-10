import React from 'react';
import {StyleSheet, View} from 'react-native';

function Divider(props) {
  return <View style={[styles.rect, props.style]} />;
}

const styles = StyleSheet.create({
  rect: {
    backgroundColor: '#2a343c',
  },
});

export default Divider;
