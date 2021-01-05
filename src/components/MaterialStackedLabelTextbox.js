import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";

function MaterialStackedLabelTextbox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TextInput placeholder="제목" style={styles.inputStyle}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent"
  },
  inputStyle: {
    color: "#000",
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 8,
    paddingBottom: 8
  }
});

export default MaterialStackedLabelTextbox;
