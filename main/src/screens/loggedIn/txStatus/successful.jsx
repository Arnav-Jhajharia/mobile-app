import React, {useEffect} from 'react';
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
const successVideo = require('./successful.mov');
import PointsModal from './pointsModal';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SECRET_KEY_REMMITEX } from '@env';
import CryptoJS from 'react-native-crypto-js';
import transactions from '../investments/backend/txFunctions';
import { Icon } from 'react-native-elements';

const addPoints = async (userId, transactionAmount) => {
  try {
    const response = await fetch('https://refer.xade.finance/points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, transactionAmount })
    });

    const data = await response.json();
    if(data.points > 0)
    return data.points;
    else return 0;
  } catch (err) {
    return 0;
    console.error(err);
  }
};

export default function Component({navigation, route}) {
  const [isPoints, setIsPoints] = useState(true);
  const [showModal, setShowModal] = useState('what');
  const [address, setAddress] = useState('0x');
  const [mainnet, setMainnet] = useState(false);
  const [points, setPoints] = useState(0);
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
      // fetch(
      //   `https://amtowe.api.xade.finance?from=${route.params.walletAddress}&to=${route.params.emailAddress}&amt=${route.params.amount}`)
      //               .then((res) => res.text())
      //               .then((json) => {
        
      // })
      const inputValue = JSON.stringify({
        "senderName":"Madarchod",
        "senderAddr":route.params.walletAddress,
        "receiver":route.params.emailAddress,
        "amount":route.params.amount,
        "timestamp":Date.now()

      })  
      
      const encrypted = CryptoJS.AES.encrypt(inputValue, SECRET_KEY_REMMITEX).toString();
      fetch(
        `https://amtowe.api.xade.finance/testnet`, {method:'POST', headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: encrypted
        })})
                    .then((res) => res.text())
                    .then((json) => {
                    console.log(json)
      })

      const mainnetJSON = await AsyncStorage.getItem('mainnet');
      const _mainnet = JSON.parse(mainnetJSON);
      setMainnet(_mainnet);
      
      console.log('Mainnet', _mainnet);
      if (_mainnet == false) {
        const newPoints = await addPoints(_address, route.params.amount)
        console.log(newPoints)
        setPoints(route.params.amount * 20);
      }

    }
  }
    getAddress();
  });

  const hash = route.params;
  console.log(route.params);
  return (
    // <View style={{width: '100%', height: '100%', backgroundColor: '#0c0c0c'}}>
    //   <Text
    //     style={{
    //       color: '#fff',
    //       fontSize: 30,
    //       marginTop: '20%',
    //       textAlign: 'center',
    //       fontFamily: 'NeueMachina-UltraBold',
    //     }}>
    //     Transaction Success!
    //   </Text>
    //   <View style={{width: '80%', marginTop: '25%', marginLeft: '11%'}}>
    //     <Video
    //       source={successVideo}
    //       style={{width: 300, height: 300}}
    //       controls={false}
    //       repeat={true}
    //       ref={ref => {
    //         this.player = ref;
    //       }}
    //     />
    //   </View>
    //   <TouchableOpacity
    //     onPress={() =>
    //       Linking.openURL(`https://mumbai.polygonscan.com/tx/${hash['status']}`)
    //     }
    //     style={{marginTop: '20%'}}>
    //     <Text
    //       style={{
    //         color: '#fff',
    //         fontSize: 20,
    //         textAlign: 'center',
    //         fontFamily: 'VelaSans-ExtraBold',
    //       }}>
    //       View Transaction On BlockExplorer
    //     </Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={() => {
    //       navigation.push('Payments');

    //       // Alert.alert('Success');
    //     }}>
    //     <Text
    //       style={{
    //         color: '#fff',
    //         fontSize: 20,
    //         marginTop: '30%',
    //         textAlign: 'center',
    //         fontFamily: 'VelaSans-Bold',
    //       }}>
    //       Return Home
    //     </Text>
    //   </TouchableOpacity>
    // </View>
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} >
      <Icon
  name='arrow-back'
  type='material'
  color='#fff'
  onPress={() => {
    // handle back button press
  }}
/>
      </TouchableOpacity>
      <View style={styles.content}>
        {/* <Image source={require('./coin.png')} style={styles.coinImage} /> */}
        {/* <View style={{width: '80%', marginTop: '25%', justifyContent: 'center'}}> */}
        <Video
          source={successVideo}
          style={{width: 300, height: 200, marginLeft: '20%', scale: '1.5', transform: [{ scale: 1.6}],}}
          controls={false}
          repeat={true}
          ref={ref => {
            this.player = ref;
          }}
        />
      {/* </View> */}
        <Text style={styles.successText}>Thank you!</Text>
        {(mainnet == true)?
        <Text style={styles.earnedCoinsText}>You've just earned {points} Xade coins</Text>
      :
      ""}
        <Text style={styles.amountText}>${route.params.amount}</Text>

        <Text style={styles.earnedCoinsText2}>To Name({route.params.walletAddress.slice(0, 5)}...)</Text>
      </View>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: '30%',
    backgroundColor: '#0c0c0c',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinImage: {
    width: 150,
    height: 150,
  },
  successText: {
    fontSize: 24,
    // fontWeight: 'bold',
    color: 'green',
    fontFamily: 'VelaSans-Bold',
    marginVertical: 20,
  },
  earnedCoinsText: {
    fontSize: 18,
    color: 'white`',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  earnedCoinsText2: {
    fontSize: 20,
    color: 'white`',
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'VelaSans-Bold',
    marginTop: 30,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  amountText: {
    fontSize: 50,
    color: '#03ac13',
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'VelaSans-Bold'

  },
});

