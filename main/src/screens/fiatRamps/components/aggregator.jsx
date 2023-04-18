import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import BuyCryptoPage from './widget';
const onrampLogo = require('./onramp.png');
const transakLogo = require('./transak.webp');
const onramperLogo = require('./onramper.png')
const wyre = require('./wyre.png')
const FiatRamps = ({navigation}) => {
  const [widget, setWidget] = useState('transak')
  const [address, setAddress] = useState('0x');
  const [name, setName] = useState('0x');
  // if (global.withAuth) {
  //   setName(global.loginAccount.name);
  //   setAddress(global.loginAccount.publicAddress);
  // }
  // else {
  //   setName(global.connectAccount.name);
  //   setAddress(global.connectAccount.publicAddress);
  // }
  useEffect(() => {
    async function getAddress()
    {
      setAddress(await AsyncStorage.getItem('address'))
    }
    getAddress();
  })
  const handleOpenBuyCryptoModal = (wid) => {
    setWidget(wid)
    setShowBuyCryptoModal(true);
  };

  const handleCloseBuyCryptoModal = () => {
    setShowBuyCryptoModal(false);
  };

  const [showBuyCryptoModal, setShowBuyCryptoModal] = useState(false);
  return (
    <View style={styles.container}>
              <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.navigate('Payments')}} >
            <Ionicons name="close-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Deposit funds</Text>
          <TouchableOpacity>
            <Ionicons name="refresh-outline" style = {{display: 'none'}} size={24} color="" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style = {{alignSelf: 'center', color: 'white', backgroundColor: 'black', padding: 8, paddingLeft: 15, paddingRight: 15, borderRadius: 15}}><Text style = {{color: 'white'}}>Polygon Mainnet</Text></TouchableOpacity>
        <View style = {{alignSelf: 'center', color: 'white', padding: 8, paddingLeft: 15, paddingRight: 15, borderRadius: 15}}><Text style = {{color: 'white', textAlign: 'center'}}>Deposit funds in your Xade account from your wallet or convert your fiat to USDC which is a digital currency backed 1:1 with USD with one of our partners</Text></View>
      <TouchableOpacity  style={[styles.optionContainer, {marginTop: '20%'}]}>
        <View style = {{flexDirection: 'row'}}>
        <Ionicons name="wallet-outline" size={24} color="#1abc9c" />
        <Text style={styles.optionText}>From wallet</Text>
        </View>
        <Text style={[styles.optionText, {color: 'green'}]}>Available</Text>

      </TouchableOpacity>
      {showBuyCryptoModal && (
        <BuyCryptoPage
          name={name}
          address={address}
          widget = {widget}
          uri={`https://onramp.money/main/buy/?appId=251363&walletAddress=${address}`}
          onClose={handleCloseBuyCryptoModal}
        />
      )}
      {/* <View style={styles.hr}></View> */}
      <TouchableOpacity onPress={() => handleOpenBuyCryptoModal('onramp')} style={styles.optionContainer}>
        {/* <View style = > */}
      <Image source={onrampLogo} style={styles.image} />
        <Text style={[styles.optionText, {color: 'green'}]}>Available</Text>
        {/* </View> */}
        {/* <View style={styles.hr}></View> */}
      </TouchableOpacity>


      {/* <View style={styles.hr}></View> */}
      <TouchableOpacity onPress={() => handleOpenBuyCryptoModal('transak')} style={styles.optionContainer}>
        <View>
      <Image source={transakLogo} style={styles.image}/>
      </View>
      {/* <Image source={onrampLogo} style={styles.image} /> */}

        <Text style={[styles.optionText, {color: 'green'}]}>Available</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ComingSoon')} style={styles.optionContainer}>
      <Image source={wyre} style={[styles.image, {tintColor: '#fff'}]} />
        <Text style={[styles.optionText, {color: 'red'}]}>Unavailable</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOpenBuyCryptoModal('transak')} style={styles.optionContainer}>
        <View>
      <Image source={onramperLogo} style={styles.image}/>
      </View>
      {/* <Image source={onrampLogo} style={styles.image} /> */}

        <Text style={[styles.optionText, {color: 'red'}]}>Unavailable</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',

    // flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#0C0C0C', // dark background color
  },
  depositText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // white text color
    marginBottom: 100,
  },
  optionContainer: {
    // aspectRatio: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#1f1f1f', // dark option background color
    borderWidth: 2,
    padding: 10,
    height: 50,
    // textAlign: 'center',
    borderRadius: 5,
    justifyContent: 'space-between'
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'VelaSans-Bold',
    color: '#fff', // white text color
  },
  hr: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 8,
  },

  image: {
    width: 120,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default FiatRamps;

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import CryptoJS from 'react-native-crypto-js';

// function App() {
//   const [inputValue, setInputValue] = useState('');
//   const [encryptedValue, setEncryptedValue] = useState('');

//   const encryptValue = () => {
//     const encrypted = CryptoJS.AES.encrypt(inputValue, '4a2f9d7e').toString();
//     setEncryptedValue(encrypted);
//     setInputValue('');
//     console.log(encrypted)
//     sendEncryptedValue(encrypted);
//   };

//   const sendEncryptedValue = (encrypted) => {
//     fetch('http://192.168.0.108:4000/decrypt', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ encryptedValue: encrypted })
//     })
//       .then(response => response.json())
//       .then(data => console.log(data))
//       .catch(error => console.error(error));
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Enter a value to encrypt:</Text>
//       <TextInput style={styles.input} value={inputValue} onChangeText={setInputValue} />
//       <Button title="Encrypt" onPress={encryptValue} />
//       {encryptedValue !== '' && <Text style = {{color: 'black'}}>Encrypted value: {encryptedValue}</Text>}
//     </View>
//   );
// }
