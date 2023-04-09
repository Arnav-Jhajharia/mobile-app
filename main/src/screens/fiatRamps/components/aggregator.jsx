import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BuyCryptoPage from './widget';
const onrampLogo = require('./onramp.png');
const transakLogo = require('./transak.webp');

const FiatRamps = () => {
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
      <Text style={styles.depositText}>Deposit funds</Text>
      <TouchableOpacity  style={[styles.optionContainer, {marginTop: '20%'}]}>
        <Ionicons name="wallet-outline" size={24} color="#1abc9c" />
        <Text style={styles.optionText}>From wallet</Text>
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
      <View style={styles.hr}></View>
      <TouchableOpacity onPress={() => handleOpenBuyCryptoModal('onramp')} style={styles.optionContainer}>
      <Image source={onrampLogo} style={styles.image} />
        {/* <Text style={styles.optionText}>Onramp</Text> */}
      </TouchableOpacity>
      <View style={styles.hr}></View>
      <TouchableOpacity onPress={() => handleOpenBuyCryptoModal('transak')} style={styles.optionContainer}>
      <Image source={transakLogo} style={styles.image} resizeMode="center" />
        {/* <Text style={styles.optionText}>Transak</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',

    // flex: 1,
    padding: 20,
    backgroundColor: '#0C0C0C', // dark background color
  },
  depositText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // white text color
    marginBottom: 100,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#1f1f1f', // dark option background color
    padding: 10,
    height: 50,
    textAlign: 'center',
    borderRadius: 5,
    justifyContent: 'center'
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    
    color: '#fff', // white text color
  },
  hr: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 8,
  },

  image: {
    // width: '85%',
    height: '100%'
  }
});

export default FiatRamps;
