import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignupFrom from './SignupFrom';
import SearchVendor from './SearchVendor';

const RootStack = createStackNavigator();

function Signup() {
  return (
    <RootStack.Navigator mode="modal" headerMode="none">
      <RootStack.Screen name="Main" component={SignupFrom} />
      <RootStack.Screen name="MyModal" component={SearchVendor} />
    </RootStack.Navigator>
  );
}

export default Signup;
