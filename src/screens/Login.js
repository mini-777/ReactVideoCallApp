import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import Divider from "../components/Divider";

function Login(props) {
  return (
    <View style={styles.rect}>
      <StatusBar hidden />
      <View style={styles.무진콜에로그인하세요Column}>
        <Text style={styles.무진콜에로그인하세요}>무진콜에 로그인하세요</Text>
        <View style={styles.rect2}></View>
        <Text style={styles.id3}>ID</Text>
        <Text style={styles.text4}>Password</Text>
        <TextInput
          placeholder=""
          secureTextEntry={true}
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.text5}>Forgotten your password?</Text>
        <TextInput placeholder="" style={styles.textInput2}></TextInput>
      </View>
      <View style={styles.무진콜에로그인하세요ColumnFiller}></View>
      <View style={styles.rect4}>
        <Divider style={styles.divider}></Divider>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Contact")}
          style={styles.button2}
        >
          <Text style={styles.로그인3}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: "#141f28"
  },
  무진콜에로그인하세요: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    lineHeight: 50,
    marginTop: 118,
    marginLeft: 17
  },
  rect2: {
    height: 98,
    backgroundColor: "#1c2a38",
    marginTop: -168
  },
  id3: {
    color: "rgba(123,139,151,1)",
    fontSize: 16,
    lineHeight: 20,
    marginTop: 102,
    marginLeft: 18
  },
  text4: {
    color: "rgba(123,139,151,1)",
    fontSize: 18,
    lineHeight: 20,
    marginTop: 87,
    marginLeft: 17
  },
  textInput: {
    width: 339,
    height: 42,
    color: "#1da1f2",
    borderColor: "rgba(123,139,151,1)",
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: 2,
    marginLeft: 17
  },
  text5: {
    color: "#7b8b97",
    fontSize: 18,
    lineHeight: 20,
    marginTop: 50,
    marginLeft: 82
  },
  textInput2: {
    width: 339,
    height: 42,
    color: "#1da1f2",
    borderColor: "#1da1f2",
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: -220,
    marginLeft: 17
  },
  무진콜에로그인하세요Column: {},
  무진콜에로그인하세요ColumnFiller: {
    flex: 1
  },
  rect4: {
    height: 91
  },
  divider: {
    width: 360,
    height: 1
  },
  button2: {
    width: 109,
    height: 50,
    backgroundColor: "#1da1f2",
    borderRadius: 100,
    justifyContent: "center",
    marginTop: 13,
    marginLeft: 240
  },
  로그인3: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 20,
    alignSelf: "center"
  }
});

export default Login;
