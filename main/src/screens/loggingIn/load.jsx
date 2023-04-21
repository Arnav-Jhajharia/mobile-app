import React, {Component, useEffect} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  Button,
  ActivitusdcyIndicator,
} from 'react-native';
import {Text} from '@rneui/themed';
import {Icon} from 'react-native-elements';

import {PNAccount} from '../../Models/PNAccount';

import * as particleAuth from 'react-native-particle-auth';
import * as particleConnect from 'react-native-particle-connect';

import {BICONOMY_API_KEY} from '@env';

import {WalletType, ChainInfo, Env} from 'react-native-particle-connect';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {IPaymaster, ChainId} from '@biconomy/core-types';
import SmartAccount from '@biconomy/smart-account';

import getOnlyProvider from '../../particle-auth';

import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';

var DeviceInfo = require('react-native-device-info');

const LoginCheck = async ({navigation}) => {
  // global.mainnet = true;
  const mainnet = await AsyncStorage.getItem('mainnet');
  if (!mainnet)
    // null
    await AsyncStorage.setItem('mainnet', JSON.stringify(true));
  // await particleAuth.logout()
  particleAuth.init(
    particleAuth.ChainInfo.PolygonMainnet,
    particleAuth.Env.Production,
  );
  // await particleAuth.logout()
  console.log('Device ID:', DeviceInfo.getUniqueIdSync());

  console.log('Checking if user is logged in');
  const result = await particleAuth.isLogin();
  console.log(result);
  if (result) {
    var account = await particleAuth.getUserInfo();
    console.log('User account', account);
    // await AsyncStorage.setItem("address", account.wallets[])
    var name;
    account = JSON.parse(account);
    const email = account.email
      ? account.email.toLowerCase()
      : account.phone
      ? account.phone
      : account.googleEmail.toLowerCase();
    const uuid = account.wallets[0].uuid;
    // console.log('Account:', account);
    // const name = account.name ? account.name : 'Not Set';
    const address = await particleAuth.getAddress();
    let options = {
      activeNetworkId: ChainId.POLYGON_MAINNET,
      supportedNetworksIds: [ChainId.POLYGON_MAINNET],

      networkConfig: [
        {
          chainId: ChainId.POLYGON_MAINNET,
          dappAPIKey: BICONOMY_API_KEY,
        },
      ],
    };
    const particleProvider = this.getOnlyProvider();
    const provider = new ethers.providers.Web3Provider(particleProvider, 'any');
    let smartAccount = new SmartAccount(provider, options);
    smartAccount = await smartAccount.init();
    global.smartAccount = smartAccount;
    const scwAddress = smartAccount.address;
    await AsyncStorage.setItem('address', address);

    // await registerFcmToken(address);
    await fetch(
      `https://user.api.xade.finance/polygon?address=${address.toLowerCase()}`,
      {
        method: 'GET',
      },
    )
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          return response.text();
        } else return '';
      })
      .then(data => {
        name = data;
      });

    global.loginAccount = new PNAccount(email, name, address, scwAddress, uuid);
    global.withAuth = true;
    console.log('Logged In:', global.loginAccount);
    navigation.navigate('Payments');
    console.log('Navigating To Payments');
  } else {
    // console.log('Not Logged In');
    // navigation.navigate('LoggedOutHome');
    // console.log('Navigating To Home');
    await fetch(
      `https://user.api.xade.finance/uuid?uuid=${DeviceInfo.getUniqueIdSync().toString()}`,
      {
        method: 'GET',
      },
    )
      .then(response => {
        if (response.status == 200) {
          return response.text();
        } else {
          console.log('Not Logged In');
          navigation.navigate('LoggedOutHome');
          console.log('Navigating To Home');
          return '';
        }
      })
      .then(async data => {
        const address = data;
        await AsyncStorage.setItem('address', address);
        fetch(
          `https://user.api.xade.finance/polygon?address=${address.toLowerCase()}`,
          {
            method: 'GET',
          },
        )
          .then(response => {
            if (response.status == 200) {
              return response.text();
            } else return '';
          })
          .then(conname => {
            async function checkConnect() {
              const metadata = {
                name: 'Xade Finance',
                icon: 'https://connect.particle.network/icons/512.png',
                url: 'https://connect.particle.network',
              };
              const rpcUrl = {
                evm_url: 'https://rpc.ankr.com/polygon_mumbai',
                solana_url: null,
              };

              particleConnect.init(
                ChainInfo.PolygonMainnet,
                Env.Production,
                metadata,
                rpcUrl,
              );

              console.log('Name:', conname);
              const name = conname;
              const uuid = DeviceInfo.getUniqueIdSync().toString();
              const types = [
                WalletType.MetaMask,
                WalletType.Alpha,
                WalletType.Trust,
                WalletType.Rainbow,
                WalletType.WalletConnect,
              ];

              for (let i = 0; i < types.length; i++) {
                if (await particleConnect.isConnected(types[i], address)) {
                  global.connectAccount = new PNAccount(
                    types[i],
                    name,
                    address,
                    uuid,
                  );
                  await particleConnect.reconnectIfNeeded(types[i], address);
                  global.withAuth = false;
                  global.walletType = types[i];
                  console.log('Logged In:', global.connectAccount);
                  navigation.navigate('Payments');
                  console.log('Navigating To Payments');
                }
              }
            }
            checkConnect();
          });
      });
  }
};

const PreLoad = ({navigation}) => {
  useEffect(() => {
    async function preLoadLog() {
      await LoginCheck({navigation});
    }
    preLoadLog();
  }, []);
  return (
    <View style={styles.black}>
      <Text style={styles.logo}>XADE</Text>
      {/* <View>
        <ActivityIndicator style={styles.loader} color="#fff" />
        <Text style={styles.logging}>{'    '}Loading...</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  black: {
    width: '100%',
    backgroundColor: '#0C0C0C',
    height: '100%',
  },

  logo: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: '63%',
    fontSize: 50,
    fontFamily: 'LemonMilk-Regular',
  },

  loader: {
    marginTop: '90%',
  },

  logging: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
    marginTop: '1%',
    fontFamily: 'VelaSans-Bold',
  },
});
export default PreLoad;
