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
      <View style={styles.rect1}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Main")}
          style={styles.button1}
        >
          <Text style={styles.문의하기1}></Text>
        </TouchableOpacity>
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
  문의하기1: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 23,
    marginLeft: 14
  },
  materialChipBasic: {
    width: 249,
    height: 59,
    marginTop: 256,
    marginLeft: 56
  }
});

export default Main;
