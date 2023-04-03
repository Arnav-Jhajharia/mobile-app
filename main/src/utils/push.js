import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage'
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
getFcmToken()  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('token')
  console.log(fcmToken, "the old token")
  if(!fcmToken)
  {
    try {
    const fcmToken = await messaging().getToken();
    if(fcmToken)
    {
      console.log(fcmToken, "new generated token")
      await AsyncStorage.setItem('token', fcmToken)
      fetch()
    }
  }
  catch(error)
  {
    console.log(error)
  }
  }
}