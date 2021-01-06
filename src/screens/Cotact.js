import React, { Component, useState } from "react";
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
import axios from 'axios'
import App from '../../App'




function Contact(props) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');

  const sendMessage = async (title, subject) => {
    axios
    .post('http://3.35.8.116:3001/send', {
        token: 'djNASZCCRyaAionysSlH6E:APA91bEBTxhAN3U15AhVlDcY0mkVVCjeLJVjXfAjvUSXWLdat9MQUEF1uZ6CGu9BSO5OJmhdYcaAV8x66WSmBtSIXrxLKf1P-wDpT90va2wlJby1vvw4D0rBBj4yBQnHld2tG8h11J8k',
        title: title,
        subject: subject,
    })
    .then(() => console.log('Book Created'))
    .catch(err => {
      console.error(err);
    });
  }
  const startVideocall = (title, subject) => {
    sendMessage();
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
        <MaterialStackedLabelTextbox
          style={styles.materialStackedLabelTextbox}
        ></MaterialStackedLabelTextbox>
        <View style={styles.materialUnderlineTextboxStack}>
          <MaterialUnderlineTextbox
            style={styles.materialUnderlineTextbox}
          ></MaterialUnderlineTextbox>
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
    height: 84,
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
    lineHeight: 20,
    alignSelf: "center"
  },
  materialUnderlineTextboxStack: {
    width: 297,
    height: 399,
    marginTop: 11,
    marginLeft: 20
  }
});

export default Contact;
