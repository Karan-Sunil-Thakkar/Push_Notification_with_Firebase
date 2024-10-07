import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {requestUserPermission} from './src/utils/PushNotificatiom';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  async function getToken() {
    const token = await messaging().getToken();
    console.log('Device FCM Token:', token);
    return token;
  }

  getToken();
  useEffect(() => {
    //requestUserPermission();
    requestPermissions();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
        ]);

        if (
          granted['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_MEDIA_IMAGES'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_MEDIA_VIDEO'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_MEDIA_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('All permissions granted');
        } else {
          console.log('Permissions denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    // color:'#000',
    fontWeight: '600',
  },
});
