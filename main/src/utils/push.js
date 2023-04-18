import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, StyleSheet} from 'react-native';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {  
    console.log('Authorization status:', authStatus);
    getFcmToken();

  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('token');
  console.log(fcmToken, 'the old token');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, 'new generated token');
        await AsyncStorage.setItem('token', fcmToken);
        fetch();
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }
};

export const generateTopic = async () => {
  
  messaging().subscribeToTopic("both")
  .then(() => console.log('Subscribed to topic!' + "both"))
  .catch(error => console.error('Error subscribing to topic:', error));

  const osSpecific = Platform.OS === 'ios'?'ios':'android'
  
  messaging().subscribeToTopic(osSpecific)
  .then(() => console.log('Subscribed to topic!' + osSpecific))
  .catch(error => console.error('Error subscribing to topic:', error));
}



export const registerFcmToken = async (address) => {
    const url = 'https://refer.xade.finance/registerDevice';
    const token = await AsyncStorage.getItem('token');

    const notifsdata = {
      walletAddress: address.toLowerCase(),
      deviceToken: token,
    };

    console.log('req being sent');
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notifsdata),
    })
      .then(response => {
        if (!response.ok) {
          console.log(response);
          throw new Error('Network response was not ok');
        }
        // console.log(response.json());
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was an error:', error);
      });
}


