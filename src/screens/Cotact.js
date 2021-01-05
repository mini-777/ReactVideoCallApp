import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text
} from "react-native";
import MaterialStackedLabelTextbox from "../components/MaterialStackedLabelTextbox";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import MaterialButtonPrimary from "../components/MaterialButtonPrimary";

function Contact(props) {
  return (
    <View style={styles.rect}>
      <StatusBar hidden />
      <View style={styles.rect2}>
        <View style={styles.buttonStack}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("DrawerPanel")}
            style={styles.button}
          ></TouchableOpacity>
          <Text style={styles.문의하기}>문의하기</Text>
        </View>
        <View style={styles.buttonStackFiller}></View>
        <View style={styles.rect3}></View>
      </View>
      <View style={styles.rect2Filler}></View>
      <View style={styles.rect4}>
        <MaterialStackedLabelTextbox
          style={styles.materialStackedLabelTextbox}
        ></MaterialStackedLabelTextbox>
        <MaterialUnderlineTextbox
          style={styles.materialUnderlineTextbox}
        ></MaterialUnderlineTextbox>
        <MaterialButtonPrimary
          style={styles.materialButtonPrimary}
        ></MaterialButtonPrimary>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: "#141f2b"
  },
  rect2: {
    height: 84,
    backgroundColor: "#1c2a38",
    flexDirection: "row"
  },
  button: {
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    position: "absolute"
  },
  문의하기: {
    top: 23,
    left: 14,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 24
  },
  buttonStack: {
    width: 110,
    height: 55,
    marginLeft: 17,
    marginTop: 17
  },
  buttonStackFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rect3: {
    width: 31,
    height: 28,
    marginRight: 18,
    marginTop: 28
  },
  rect2Filler: {
    flex: 1
  },
  rect4: {
    width: 338,
    height: 562,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    marginBottom: 67,
    alignSelf: "center"
  },
  materialStackedLabelTextbox: {
    height: 60,
    width: 284,
    marginTop: 48,
    alignSelf: "center"
  },
  materialUnderlineTextbox: {
    height: 351,
    width: 297,
    marginTop: 11,
    alignSelf: "center"
  },
  materialButtonPrimary: {
    height: 50,
    width: 316,
    borderRadius: 24,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 0.35,
    shadowRadius: 0,
    marginTop: 18,
    marginLeft: 11
  }
});

export default Contact;
