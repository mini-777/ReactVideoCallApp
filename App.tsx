import React, {Component} from 'react'
import {Alert, Platform, PushNotificationIOS, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import RtcEngine, {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora'
import messaging, { firebase } from '@react-native-firebase/messaging'
import requestCameraAndAudioPermission from './components/Permission'
import styles from './components/Style'
import axios from 'axios'


interface Props {
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




export default class App extends Component<Props, state> {
    
    _engine?: RtcEngine

    constructor(props) {
        super(props)
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
        
        // messaging().onMessage(async remoteMessage => {
        //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // });

        axios.get('http://3.35.8.116:8080/rtcToken?channelName=videoCall').then((Response)=>{
            this.setState({token : Response.data.key});
            console.log('RTCtoken...', this.state.token);
        }).catch((Error) => {
            console.log(Error);
        })

        
        
        
    }
    componentDidUpdate() {

        // messaging().onMessage(async remoteMessage => {
        //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        // });
     
      
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

    sendMessage = async () => {
        axios
        .post('http://3.35.8.116:3001/send', {
            token: 'erqXuqcxR1OKoFzx-GiK_V:APA91bETVWQlDwlhYJbuAGwkESfhkr7x9Ky7zwzueGAZuMm218NVBTIpWqyHBpaUCpKS6QYu5-U03YO0CfkGO8j0knNUgFkbG9tBjSBwn3aJtyA3U-uduVGLs-hyARUJInhdyYN2BPwi',
            title: '브레이크 패드가 고장이 났어요',
            subject: '브레이크 패드에서 계속 소리가 나는데 고쳐주실 정비사분 구합니다.'
        })
        .then(() => console.log('Book Created'))
        .catch(err => {
          console.error(err);
        });
    }

    startVideocall = () => {
        this.sendMessage();
        this.startCall();
    }

    render() {
        return (
            <View style={styles.max}>
                <View style={styles.max}>
                    <View style={styles.buttonHolder}>
                        <TouchableOpacity
                            onPress={this.sendMessage}
                            style={styles.button}>
                            <Text style={styles.buttonText}> Start Call </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.endCall}
                            style={styles.button}>
                            <Text style={styles.buttonText}> End Call </Text>
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