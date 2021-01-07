import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput 
} from "react-native";
import MaterialStackedLabelTextbox from "../components/MaterialStackedLabelTextbox";
import MaterialUnderlineTextbox from "../components/MaterialUnderlineTextbox";
import MaterialButtonPrimary from "../components/MaterialButtonPrimary";
import axios from 'axios'
import App from '../../App'
import { sub } from "react-native-reanimated";




function Contact(props) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');

  const sendMessage = async (title, subject) => {
    console.log(title, subject);
    axios
    .post('http://3.35.8.116:3001/send', {
        token: 'eqXVprSUS0uAxOUMJITf7K:APA91bHXMSZqDFX2tKJuTQf2faYiM1d18cycPGf0omcI7UK93EaUGT00M_fFKbGnkTduZSYh4pzmhZUZ2qiAGOCon4JsGo9xhmVRkr-uRWAPdCfbKjqZbUA84vdu1I9iK5fTw9c1eK4d',
        title: title,
        subject: subject,
    })
    .then(() => console.log('Book Created'))
    .catch(err => {
      console.error(err);
    });
  }
  const startVideocall = () => {
    sendMessage(title, subject);
    props.navigation.navigate("Videocall")
  }


    
    

  return (
    <View style={styles.rect}>
      <StatusBar hidden />
      <View style={styles.rect2}>
        <Text style={styles.문의하기}>문의하기</Text>
        <View style={styles.문의하기Filler}></View>
        <View style={styles.rect3}></View>
      </View>
      <View style={styles.rect4}>
          <View style={[styles.container, props.style, styles.materialStackedLabelTextbox]}>
      <TextInput placeholder="제목" style={styles.inputStyle} onChangeText={text => setTitle(text)}></TextInput>
    </View>
        <View style={styles.materialUnderlineTextboxStack}>
      <View style={[styles.container, props.style, styles.materialUnderlineTextbox]}>
      <TextInput placeholder="상세 내용" style={styles.inputStyle} onChangeText={text => setSubject(text)}></TextInput>
    </View>
          <TouchableOpacity
            onPress={startVideocall}
            style={styles.button1}
          >
            <Text style={styles.로그인1}>로그인</Text>
          </TouchableOpacity>
        </View>
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
    height: 70,
    backgroundColor: "#1c2a38",
    flexDirection: "row"
  },
  문의하기: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginLeft: 31,
    marginTop: 28
  },
  문의하기Filler: {
    flex: 1,
    flexDirection: "row"
  },
  rect3: {
    width: 31,
    height: 28,
    marginRight: 18,
    marginTop: 28
  },
  rect4: {
    width: 338,
    height: 562,
    backgroundColor: "#E6E6E6",
    borderRadius: 21,
    marginTop: 5,
    alignSelf: "center"
  },
  materialStackedLabelTextbox: {
    height: 60,
    width: 284,
    marginTop: 70,
    alignSelf: "center"
  },
  materialUnderlineTextbox: {
    height: 351,
    width: 297,
    position: "absolute",
    top: 0,
    left: 0
  },
  button1: {
    top: 349,
    width: 284,
    height: 50,
    backgroundColor: "#1da1f2",
    position: "absolute",
    borderRadius: 100,
    left: 7,
    justifyContent: "center"
  },
  로그인1: {
    color: "#ffffff",
    fontSize: 24,
    lineHeight: 30,
    alignSelf: "center"
  },
  materialUnderlineTextboxStack: {
    width: 297,
    height: 399,
    marginTop: 11,
    marginLeft: 20
  },
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

export default Contact;
