import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function TweetComponent(props) {
  return (
    <View style={[styles.rect, props.style]}>
      <View style={styles.imageRow}>
        <Image
          source={require("../assets/images/WcF2F1c9_400x400.png")}
          resizeMode="cover"
          style={styles.image}
        ></Image>
        <View style={styles.textRowColumn}>
          <View style={styles.textRow}>
            <Text style={styles.text}>BuilderX</Text>
            <Text style={styles.text2}>@BuilderXio</Text>
            <Text style={styles.text3}>• 20 Jul</Text>
          </View>
          <Text style={styles.text4}>
            We are coming to @react_india{"\n"}Hype for the greatest Design
            -&gt; Code #Tool {"\n"}is real &amp; we will celebrate it in #Goa
            this September.{"\n"}
            {"\n"}#design #react
          </Text>
        </View>
        <IoniconsIcon name="ios-arrow-down" style={styles.icon}></IoniconsIcon>
      </View>
      <View style={styles.rect2}>
        <View style={styles.rect3}>
          <View style={styles.icon2Row}>
            <EvilIconsIcon name="comment" style={styles.icon2}></EvilIconsIcon>
            <Text style={styles.text5}>20</Text>
          </View>
        </View>
        <View style={styles.rect4}>
          <View style={styles.icon3Row}>
            <EvilIconsIcon name="retweet" style={styles.icon3}></EvilIconsIcon>
            <Text style={styles.text6}>2K</Text>
          </View>
        </View>
        <View style={styles.rect5}>
          <MaterialCommunityIconsIcon
            name="heart"
            style={styles.icon4}
          ></MaterialCommunityIconsIcon>
          <Text style={styles.text7}>20K</Text>
        </View>
        <EvilIconsIcon name="share-google" style={styles.icon5}></EvilIconsIcon>
        <IoniconsIcon name="ios-stats" style={styles.icon6}></IoniconsIcon>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {},
  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
    borderColor: "#1c2a38",
    borderWidth: 0,
    marginTop: 2
  },
  text: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    lineHeight: 20
  },
  text2: {
    color: "#798894",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10
  },
  text3: {
    color: "#798894",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 14
  },
  textRow: {
    height: 20,
    flexDirection: "row",
    marginRight: 32
  },
  text4: {
    color: "rgba(255,255,255,1)",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 2
  },
  textRowColumn: {
    width: 241,
    marginLeft: 8
  },
  icon: {
    color: "#798894",
    fontSize: 20,
    marginLeft: 10
  },
  imageRow: {
    height: 97,
    flexDirection: "row",
    marginRight: 5
  },
  rect2: {
    width: 258,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginLeft: 68
  },
  rect3: {
    width: 39,
    height: 20,
    flexDirection: "row"
  },
  icon2: {
    color: "#8394a1",
    fontSize: 20
  },
  text5: {
    color: "#8394a1",
    fontSize: 12,
    marginLeft: 4,
    marginTop: 4
  },
  icon2Row: {
    height: 23,
    flexDirection: "row",
    flex: 1,
    marginRight: 2
  },
  rect4: {
    width: 37,
    height: 20,
    flexDirection: "row"
  },
  icon3: {
    color: "#17b45e",
    fontSize: 20
  },
  text6: {
    color: "#8394a1",
    fontSize: 12,
    marginLeft: 2,
    marginTop: 4
  },
  icon3Row: {
    height: 23,
    flexDirection: "row",
    flex: 1,
    marginRight: 2
  },
  rect5: {
    width: 45,
    height: 20,
    flexDirection: "row",
    alignItems: "stretch",
    alignSelf: "center",
    justifyContent: "space-between"
  },
  icon4: {
    color: "rgba(208,2,27,1)",
    fontSize: 20,
    alignSelf: "stretch"
  },
  text7: {
    color: "#8394a1",
    alignSelf: "center",
    fontSize: 12
  },
  icon5: {
    color: "#8394a1",
    fontSize: 20,
    alignSelf: "stretch"
  },
  icon6: {
    color: "#8394a1",
    fontSize: 20,
    alignSelf: "stretch"
  }
});

export default TweetComponent;
