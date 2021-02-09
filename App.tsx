import React, {useEffect} from 'react';
import Contact from './src/screens/Cotact';
import Login from './src/screens/Login';
import Videocall from './src/screens/Videocall';
import Signup from './src/screens/Signup';
import Start from './src/screens/Start';
import Vendor from './src/screens/Vendor';
import Splash from './src/screens/Splash';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Main from './src/screens/Main';
const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    requestUserPermission();
  });

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="videoCall"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1c2a38',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            title: 'Splash',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Start"
          component={Start}
          options={{
            title: '시작하기',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: '로그인'}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{title: '회원가입'}}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{
            title: '문의하기',
            headerShown: false,
          }}
        />
        <Stack.Screen name="Main" component={Main} options={{title: '메인'}} />
        <Stack.Screen
          name="Vendor"
          component={Vendor}
          options={{title: '고객 상담', headerShown: false}}
        />
        <Stack.Screen
          name="Videocall"
          component={Videocall}
          options={{title: '영상통화', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
