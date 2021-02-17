import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import NaverMapView, {Marker} from '../map';
import {PermissionsAndroid, Platform} from 'react-native';

const P4 = {latitude: 35.1847307, longitude: 129.1279943};

const Location = ({navigation}) => {
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <NaverMapView
      style={{width: '100%', height: '100%'}}
      center={{...P4, zoom: 13}}
      onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
      onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
      onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
      <Marker
        coordinate={P4}
        onClick={() => console.log('onClick! p4')}
        image={require('../img/marker.png')}
        width={48}
        height={48}
      />
    </NaverMapView>
  );
};

async function requestLocationPermission() {
  if (Platform.OS !== 'android') return;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'show my location need Location permission',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default Location;
