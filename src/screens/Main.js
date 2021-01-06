import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text
} from "react-native";
import MaterialChipBasic from "../components/MaterialChipBasic";

function Main(props) {
  return (
    <View style={styles.rect}>
      <StatusBar hidden />
        <View style={styles.문의하기1Stack}>
          <Text style={styles.문의하기1}></Text>
          <Text style={styles.문의하기2}>문의하기</Text>
        </View>
      <View style={styles.rect1}>
      </View>
      <MaterialChipBasic style={styles.materialChipBasic}></MaterialChipBasic>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: "#141f28"
  },
  rect1: {
    height: 84,
    backgroundColor: "#1c2a38"
  },
  button1: {
    width: 50,
    height: 50,
    marginTop: 17,
    marginLeft: 17
  },
  materialChipBasic: {
    width: 249,
    height: 59,
    marginTop: 256,
    marginLeft: 56
  },
  문의하기1: {
    top: 14,
    left: 0,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 24
  },
  문의하기2: {
    top: 0,
    left: 0,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 24
  },
  문의하기1Stack: {
    width: 96,
    height: 32,
    marginTop: 26,
    marginLeft: 31
  },
});

export default Main;
