import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  View,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import {Text} from '@rneui/themed';
import Video from 'react-native-video';
const successVideo = require('./success.mov');
import PointsModal from './pointsModal'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SECRET_KEY_REMMITEX } from '@env';
import CryptoJS from 'react-native-crypto-js';


export default function Component({navigation, route}) {
  const [isPoints, setIsPoints] = useState(true);
  const [showModal, setShowModal] = useState('what');
  const [address, setAddress] = useState('0x');
  const [mainnet, setMainnet] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };



useEffect(() => {
  async function getAddress()
  {
    const _address = await AsyncStorage.getItem('address')
    console.log(_address);
    setAddress(_address);
    if(route.params.type == 'v2') {
      fetch(
        `https://amtowe.api.xade.finance?from=${route.params.walletAddress}&to=${route.params.emailAddress}&amt=${route.params.amount}`)
                    .then((res) => res.text())
                    .then((json) => {
        
      })
      const inputValue = JSON.stringify({
        "senderAddress":route.params.walletAddress,
        "email":route.params.emailAddress,
        "amount":route.params.amount,
        "time":Date.now()
      })  
      const encrypted = CryptoJS.AES.encrypt(inputValue, SECRET_KEY_REMMITEX).toString();
      fetch(
        `https://amtowe.api.xade.finance?data=${encrypted}`)
                    .then((res) => res.text())
                    .then((json) => {
        
      })
    }

    const mainnetJSON = await AsyncStorage.getItem('mainnet')
    const _mainnet = JSON.parse(mainnetJSON)
    setMainnet(_mainnet)
    console.log("Mainnet", _mainnet)
    if(_mainnet == false && showModal == 'what')
    {
      setShowModal(true);
    }
  }
  getAddress();
})
  
  const hash = route.params;
  console.log(route.params)
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#0C0C0C'}}>
      {(showModal && (mainnet == false)) && <PointsModal userId={address.toLowerCase()} onClose={handleCloseModal} amount = {route.params.amount} />}
      <Text
        style={{
          color: '#fff',
          fontSize: 30,
          marginTop: '20%',
          textAlign: 'center',
          fontFamily: 'NeueMachina-UltraBold',
        }}>
        Transaction Success!
      </Text>
      <View style={{width: '80%', marginTop: '25%', marginLeft: '11%'}}>
        <Video
          source={successVideo}
          style={{width: 300, height: 300}}
          controls={false}
          repeat={true}
          ref={ref => {
            this.player = ref;
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`https://mumbai.polygonscan.com/tx/${hash['status']}`)
        }
        style={{marginTop: '20%'}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'VelaSans-ExtraBold',
          }}>
          View Transaction On BlockExplorer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.push('Payments');

          // Alert.alert('Success');
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            marginTop: '30%',
            textAlign: 'center',
            fontFamily: 'VelaSans-Bold',
          }}>
          Return Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
