import React, { Component } from "react";
import MaterialChipBasic from "../components/MaterialChipBasic";
import RtcEngine, {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora'
import {Platform, PushNotificationIOS, ScrollView, Text, TouchableOpacity, View, StyleSheet, ViewBase, StatusBar, TextBase} from 'react-native'
import messaging, { firebase } from '@react-native-firebase/messaging'
import requestCameraAndAudioPermission from '../../components/Permission'
import styles from '../../components/Style'

interface Props {
  navigation: any
}

/**
* @property peerIds Array for storing connected peers
* @property appId
* @property channelName Channel Name for the current session
* @property joinSucceed State variable for storing success
*/
interface state {
  appId: string,
  token: string,
  channelName: string,
  joinSucceed: boolean,
  peerIds: number[],
  fcmToken: string,
  name: string,
  topic: string,
}

export default class Main extends Component<Props, state> {

_engine?: RtcEngine

constructor(props) {
    super(props);
    this.state = {
        appId: `17a05d44fa594610ad070bdbfee9594d`,
        token: ``,
        channelName: 'videoCall',
        joinSucceed: false,
        peerIds: [],
        fcmToken: ``,
        name: 'sungMin',
        topic: 'string',
    }
    if (Platform.OS === 'android') {
        // Request required permissions from Android
        requestCameraAndAudioPermission().then(() => {
            console.log('requested!')
        })
    }
}

componentDidMount() {
  this.init()

}
componentDidUpdate() {

}

/**
 * @name init
 * @description Function to initialize the Rtc Engine, attach event listeners and actions
 */
init = async () => {
    const {appId} = this.state
    this._engine = await RtcEngine.create(appId)
    await this._engine.enableVideo()
    await firebase.messaging().registerDeviceForRemoteMessages();
    const fcmToken = await firebase.messaging().getToken();
    this.setState({fcmToken})
    console.log(fcmToken);
    this._engine.addListener('Warning', (warn) => {
        console.log('Warning', warn)
    })

    this._engine.addListener('Error', (err) => {
        console.log('Error', err)
    })

    this._engine.addListener('UserJoined', (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed)
        // Get current peer IDs
        const {peerIds} = this.state
        // If new user
        if (peerIds.indexOf(uid) === -1) {
            this.setState({
                // Add peer ID to state array
                peerIds: [...peerIds, uid]
            })
        }
    })

    this._engine.addListener('UserOffline', (uid, reason) => {
        console.log('UserOffline', uid, reason)
        const {peerIds} = this.state
        this.setState({
            // Remove peer ID from state array
            peerIds: peerIds.filter(id => id !== uid)
        })
    })

    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed)
        // Set state variable to true
        this.setState({
            joinSucceed: true
        })
    })
}

/**
 * @name startCall
 * @description Function to start the call
 */
startCall = async () => {
    // Join Channel using null token and channel name
    await this._engine?.joinChannel(this.state.token, this.state.channelName, null, 0)
}

/**
 * @name endCall
 * @description Function to end the call
 */
endCall = async () => {
    await this._engine?.leaveChannel()
    this.setState({peerIds: [], joinSucceed: false})
}

startVideocall = () => {
    this.startCall();

}

render() {
  const styled = StyleSheet.create({
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
  return(
  <View style={styled.rect}>
  <StatusBar hidden />
    <View style={styled.문의하기1Stack}>
      <Text style={styled.문의하기1}></Text>
      <Text style={styled.문의하기2}>문의받기</Text>
    </View>
  <View style={styled.rect1}>
  </View>
  <MaterialChipBasic style={styled.materialChipBasic}></MaterialChipBasic>
</View>
        // <View style={styles.max}>
        //     <View style={styles.max}>
        //         <View style={styles.buttonHolder}>
        //             <TouchableOpacity
        //                 onPress={this.sendMessage}
        //                 style={styles.button}>
        //                 <Text style={styles.buttonText}> Start Call </Text>
        //             </TouchableOpacity>
        //             <TouchableOpacity
        //                 onPress={this.endCall}
        //                 style={styles.button}>
        //                 <Text style={styles.buttonText}> End Call </Text>
        //             </TouchableOpacity>
        //         </View>
        //         {this._renderVideos()}
        //     </View>
        // </View>
  )
}

_renderVideos = () => {
    const {joinSucceed} = this.state
    return joinSucceed ? (
        <View style={styles.fullView}>
            <RtcLocalView.SurfaceView
                style={styles.max}
                channelId={this.state.channelName}
                renderMode={VideoRenderMode.Hidden}/>
            {this._renderRemoteVideos()}
        </View>
    ) : null
}

_renderRemoteVideos = () => {
    const {peerIds} = this.state
    return (
        <ScrollView
            style={styles.remoteContainer}
            contentContainerStyle={{paddingHorizontal: 2.5}}
            horizontal={true}>
            {peerIds.map((value, index, array) => {
                return (
                    <RtcRemoteView.SurfaceView
                        style={styles.remote}
                        uid={value}
                        channelId={this.state.channelName}
                        renderMode={VideoRenderMode.Hidden}
                        zOrderMediaOverlay={true}/>
                )
            })}
        </ScrollView>
    )
}
}
