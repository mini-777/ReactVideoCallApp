import React, { Component } from "react";
import MaterialButtonPink1 from "../components/MaterialButtonPink1";
import RtcEngine, {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora'
import {Platform, PushNotificationIOS, ScrollView, Text, TouchableOpacity, View, StyleSheet, ViewBase, StatusBar, TextBase} from 'react-native'
import messaging, { firebase } from '@react-native-firebase/messaging'
import requestCameraAndAudioPermission from '../../components/Permission'
import styles from '../../components/Style'
import axios from 'axios'


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



export default class Videocall extends Component<Props, state> {
    
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
      this.init();
      axios.get('http://3.35.8.116:8080/rtcToken?channelName=videoCall').then((Response)=>{
        this.setState({token : Response.data.key});
        console.log('RTCtoken...', this.state.token);
    }).catch((Error) => {
        console.log(Error);
    })
      
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

  

  render() {
    const styled = StyleSheet.create({
        rect: {
          flex: 1,
          backgroundColor: "rgba(20,31,43,1)"
        },
        materialButtonPink1: {
            height: 46,
            width: 316,
            borderRadius: 37,
            marginTop: 572,
            alignSelf: "center"
          },
        container: {
            backgroundColor: "#E91E63",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.35,
            shadowRadius: 5,
            elevation: 2,
            minWidth: 88,
            paddingLeft: 16,
            paddingRight: 16
          },
          상담종료: {
            color: "#fff",
            fontSize: 14
          },
         
      });
      return (
       
    
    
          <View style={styles.max}>
              <View style={styled.rect}>
                  <View style={styles.buttonHolder}>
                  <TouchableOpacity style={[styled.container, styled.materialButtonPink1]}
        onPress={this.startCall}>
      <Text style={styled.상담종료}>상담 종료</Text>
    </TouchableOpacity>
                  </View>
                  {this._renderVideos()}
              </View>
          </View>
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

// function Videocall(props) {
    
//     _engine ?: RtcEngine
   
//   return (
     
//   );
// }



// export default Videocall;
