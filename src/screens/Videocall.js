import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import MaterialButtonPink1 from "../components/MaterialButtonPink1";

function Videocall(props) {
  return (
    <View style={styles.rect}>
      <StatusBar hidden />
      <MaterialButtonPink1
        style={styles.materialButtonPink1}
      ></MaterialButtonPink1>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: "rgba(20,31,43,1)"
  },
  materialButtonPink1: {
    height: 46,
    width: 316,
    borderRadius: 37,
    marginTop: 572,
    alignSelf: "center"
  }
});

export default Videocall;
