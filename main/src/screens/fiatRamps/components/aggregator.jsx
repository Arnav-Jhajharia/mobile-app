import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity, Image, ScrollView } from 'react-native';
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
  const [selected, setSelected] = useState('onramp')
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
    <View>
    <ScrollView style={styles.container}>
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
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        <Ionicons name="wallet-outline" size={24} color="#1abc9c" />
        <Text style={styles.optionText}>From wallet</Text>
        </View>
        <View><Text style={[styles.optionText, {color: 'red'}]}>Unavailable</Text></View>
        </View>
        <View style={styles.hr} />
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        {/* <Ionicons name="wallet-outline" size={24} color="#1abc9c" /> */}
        <Text style={styles.optionTextBelow}>🕝  Instant $$$ • highest buy limit</Text>
        </View>
        {/* <View><Text style={[styles.optionText, {color: 'green'}]}>Available</Text></View> */}
        </View>
        {/* <View style={styles.hr} /> */}
      </TouchableOpacity>
      {showBuyCryptoModal && (
        <BuyCryptoPage
          name={name}
          address={address}
          widget = {widget}
          uri={`https://onramp.money/main/buy/?appId=251363`}
          onClose={handleCloseBuyCryptoModal}
        />
        
      )}
      <TouchableOpacity onPress={() =>setSelected('onramp')} style={
        [styles.optionContainer
          , selected=='onramp'?styles.selected:"", {marginTop: '4%'}]
        }>
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        <Ionicons name="wallet-outline" size={0} color="#1abc9c" />
        <Text style={styles.optionText}>Onramp</Text>
        </View>
        <View><Text style={[styles.optionText, {color: 'green'}]}>Available</Text></View>
        </View>
        <View style={styles.hr} />
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        {/* <Ionicons name="wallet-outline" size={24} color="#1abc9c" /> */}
        <Text style={styles.optionTextBelow}>🕝  Instant $$$ • highest buy limit</Text>
        </View>
        {/* <View><Text style={[styles.optionText, {color: 'green'}]}>Available</Text></View> */}
        </View>
        {/* <View style={styles.hr} /> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>setSelected('transak')} style={[styles.optionContainer,selected=='transak'?styles.selected:"", {marginTop: '4%'}]}>
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        <Ionicons name="wallet-outline" size={0} color="#1abc9c" />
        <Text style={styles.optionText}>Transak</Text>
        </View>
        <View><Text style={[styles.optionText, {color: 'green'}]}>Available</Text></View>
        </View>
        <View style={styles.hr} />
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        {/* <Ionicons name="wallet-outline" size={24} color="#1abc9c" /> */}
        <Text style={styles.optionTextBelow}>🕝  Instant $$$ • highest buy limit</Text>
        </View>
        {/* <View><Text style={[styles.optionText, {color: 'green'}]}>Available</Text></View> */}
        </View>
        {/* <View style={styles.hr} /> */}
      </TouchableOpacity>
      <TouchableOpacity  style={[styles.optionContainer, {marginTop: '4%'}]}>
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        <Ionicons name="wallet-outline" size={0} color="#1abc9c" />
        <Text style={styles.optionText}>Wyre</Text>
        </View>
        <View><Text style={[styles.optionText, {color: 'red'}]}>Unavailable</Text></View>
        </View>
        <View style={styles.hr} />
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        {/* <Ionicons name="wallet-outline" size={24} color="#1abc9c" /> */}
        <Text style={styles.optionTextBelow}>🕝  Instant $$$ • highest buy limit</Text>
        </View>
        {/* <View><Text style={[styles.optionText, {color: 'green'}]}>Available</Text></View> */}
        </View>
        {/* <View style={styles.hr} /> */}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.optionContainer, {marginTop: '4%', marginBottom: '20%'}]}>
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        <Ionicons name="wallet-outline" size={0} color="#1abc9c" />
        <Text style={styles.optionText}>Onramper</Text>
        </View>
        <View><Text style={[styles.optionText, {color: 'red'}]}>Unavailable</Text></View>
        </View>
        <View style={styles.hr} />
        <View style = {styles.insideText}>
          <View style={{flexDirection: 'row'}}>
        {/* <Ionicons name="wallet-outline" size={24} color="#1abc9c" /> */}
        <Text style={styles.optionTextBelow}>🕝  Instant $$$ • highest buy limit</Text>
        </View>
        {/* <View><Text style={[styles.optionText, {color: 'green'}]}>Available</Text></View> */}
        </View>
        {/* <View style={styles.hr} /> */}
      </TouchableOpacity>
    </ScrollView>
    <View style = {{backgroundColor: '#0C0C0C', height: '10%', alignItems: 'center'}}>
    <TouchableOpacity
       
            onPress={() => handleOpenBuyCryptoModal(selected)}
          
          style={styles.confirmButton}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'VelaSans-Bold',
              fontSize: 18,
            }}>
            Continue
          </Text>
        </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '90%',

    // flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#0C0C0C', // dark background color
  },

  confirmButton: {
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
    height: 55,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#67CA83',
  },
  depositText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // white text color
    marginBottom: 100,
  },
  optionContainer: {
    // aspectRatio: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#1f1f1f', // dark option background color
    borderWidth: 2,
    padding: 16,
    paddingLeft: 12,
    paddingRight: 12,
    // height: 50,
    // textAlign: 'center',
    borderRadius: 5,
    // paddingTop: 
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
  hr: {
    // backgroundColor: 'white',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    marginVertical: 15,
    width: '100%'
  },

  insideText: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '99%',
  },

  optionTextBelow: {
    color: 'white',
    fontFamily: 'VelaSans-Medium'
  }, 
  selected: {
    borderColor: '#007FFF', // dark option background color
  }
});

export default FiatRamps;
