import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

function Loading() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default Loading;
