import React, {Component} from 'react'
import {Alert, Platform, PushNotificationIOS, ScrollView, Text, TouchableOpacity, View, AppRegistry} from 'react-native'
import RtcEngine, {RtcLocalView, RtcRemoteView, VideoRenderMode} from 'react-native-agora'
import messaging, { firebase } from '@react-native-firebase/messaging'
import requestCameraAndAudioPermission from './components/Permission'
import styles from './components/Style'
import axios from 'axios'
import Modal from 'react-native-simple-modal';

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
    open: boolean,
    offset: number,
    message: string,
    title: string,
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
            open: false,
            offset: 0,
            message: '',
            title: '',
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
        
        messaging().onMessage(async remoteMessage => {
            this.setState({open:true, });
        });

        axios.get('http://3.35.8.116:8080/rtcToken?channelName=videoCall').then((Response)=>{
            this.setState({token : Response.data.key});
            console.log('RTCtoken...', this.state.token);
        }).catch((Error) => {
            console.log(Error);
        })

        
        
        
    }
    componentDidUpdate() {

        messaging().onMessage(async remoteMessage => {
            this.setState({open: true});
        });
     
      
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

    render() {
        return (
            <View style={styles.max}>
                <View style={styles.max}>
                    <Text>고객의 요청을 기다리고 있습니다...</Text>
                    <Modal
                        offset={this.state.offset}
                        open={this.state.open}
                        modalDidOpen={() => console.log('modal did open')}
                        modalDidClose={() => this.setState({open: false})}
                        >
                        <View style={styles.buttonHolder}>
                            <Text style={{fontSize: 20, marginBottom: 10}}>사용자의 문의가 도착했어요!</Text>
                            
                        </View>
                        </Modal>
                        <TouchableOpacity
                                onPress={this.startCall}
                                style={styles.button}>
                            <Text style={styles.buttonText}> 수락 하기 </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.endCall}
                                style={styles.button}>
                            <Text style={styles.buttonText}> 거절 하기 </Text>
                            </TouchableOpacity>
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
