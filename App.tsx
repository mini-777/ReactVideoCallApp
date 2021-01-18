import React, {Component} from 'react';
import Contact from './src/screens/Cotact';
import Login from './src/screens/Login';
import Videocall from './src/screens/Videocall';
import Signup from './src/screens/Signup';
import Start from './src/screens/Start';
import Vendor from './src/screens/Vendor';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Loading from './src/screens/Loading';

// const DrawerNavigation = createDrawerNavigator({
//   Start: Start,
//   Contact: Contact,
//   Login: Login,
//   Vendor: Vendor,
//   Videocall: Videocall,
//   Signup: Signup,
//   Loading: Loading,
// });

// TODO: 위쪽에 DrawerNavigation 추후에 추가해서 화면간 이동 자유롭게 하도록 수정

const StackNavigation = createStackNavigator(
  {
    DrawerNavigation: {
      screen: DrawerNavigation,
    },
    Vendor: Vendor,
    Contact: Contact,
    Login: Login,
    Videocall: Videocall,
    Signup: Signup,
    Start: Start,
    Loading: Loading,
  },
  {
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(StackNavigation);

interface Props {
  navigation: any;
}

/**
 * @property peerIds Array for storing connected peers
 * @property appId
 * @property channelName Channel Name for the current session
 * @property joinSucceed State variable for storing success
 */
// interface state {
//   appId: string;
//   token: string;
//   channelName: string;
//   joinSucceed: boolean;
//   peerIds: number[];
//   fcmToken: string;
//   name: string;
//   topic: string;
// }

export default class App extends Component<Props> {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     appId: `17a05d44fa594610ad070bdbfee9594d`,
  //     token: ``,
  //     channelName: 'videoCall',
  //     joinSucceed: false,
  //     peerIds: [],
  //     fcmToken: ``,
  //     name: 'sungMin',
  //     topic: 'string',
  //   };
  // }

  render() {
    return (
      <AppContainer />
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
    );
  }
}
