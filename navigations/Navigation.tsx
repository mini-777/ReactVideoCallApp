import React from 'react';
import Modal from 'react-native-simple-modal';
import {AppRegistry, Text, TouchableOpacity, View} from 'react-native';

export default class Example extends React.Component {
  state = {};
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => this.setState({open: true})}>
          <Text>Open modal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

AppRegistry.registerComponent('ExampleModal', () => Example);
