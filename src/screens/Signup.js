import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Divider from "../components/Divider";

function Signup(props) {
  return (
    <View style={styles.rect}>
      <StatusBar hidden />
      <View style={styles.textInputColumn}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#788793"
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.text2}>20</Text>
        <Text style={styles.계정을생성하세요}>계정을 생성하세요</Text>
      </View>
      <View style={styles.textInputColumnFiller}></View>
      <View style={styles.textInput2Column}>
        <TextInput
          placeholder="email address"
          placeholderTextColor="rgba(120,135,147,1)"
          secureTextEntry={true}
          style={styles.textInput2}
        ></TextInput>
        <View style={styles.rect2}>
          <Divider style={styles.divider}></Divider>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.다음}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: "#141f28"
  },
  textInput: {
    width: 300,
    height: 42,
    color: "#1da1f2",
    borderColor: "#1da1f2",
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginTop: 226,
    marginLeft: 6
  },
  text2: {
    color: "#757575",
    fontSize: 18,
    lineHeight: 20,
    alignSelf: "flex-end",
    marginTop: 12,
    marginRight: 1
  },
  계정을생성하세요: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    lineHeight: 50,
    marginTop: -207
  },
  icon2: {
    color: "#1da1f2",
    fontSize: 35,
    marginTop: -143
  },
  textInputColumn: {
    marginTop: 29,
    marginLeft: 24,
    marginRight: 30
  },
  textInputColumnFiller: {
    flex: 1
  },
  textInput2: {
    width: 300,
    height: 42,
    color: "#1da1f2",
    borderColor: "rgba(123,139,151,1)",
    borderWidth: 0,
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 193,
    marginLeft: 36
  },
  rect2: {
    height: 65,
    width: 375
  },
  divider: {
    width: 360,
    height: 1
  },
  button: {
    width: 109,
    height: 50,
    backgroundColor: "#1da1f2",
    borderRadius: 100,
    justifyContent: "center",
    marginTop: 13,
    marginLeft: 240
  },
  다음: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 30,
    alignSelf: "center"
  },
  textInput2Column: {
    width: 375,
    marginBottom: 29,
    marginLeft: -7
  },
  login: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginLeft: 31,
    marginTop: 28
  },
});

export default Signup;
