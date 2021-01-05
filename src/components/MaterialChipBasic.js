import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function MaterialChipBasic(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.요청을기다리고있습니다}>
        요청을 기다리고 있습니다...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(230,230,230)",
    borderRadius: 50,
    paddingLeft: 12,
    paddingRight: 12
  },
  요청을기다리고있습니다: {
    fontSize: 17,
    color: "rgba(0,0,0,0.87)"
  }
});

export default MaterialChipBasic;
