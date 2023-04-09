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
  ActivityIndicator,
} from 'react-native';
import {Text} from '@rneui/themed';
import {Icon} from 'react-native-elements';

import {PNAccount} from '../../Models/PNAccount';

import * as particleAuth from 'react-native-particle-auth';
import * as particleConnect from 'react-native-particle-connect';

import {WalletType, ChainInfo, Env} from 'react-native-particle-connect';

var DeviceInfo = require('react-native-device-info');

const LoginCheck = async ({navigation}) => {
  global.mainnet = true;
  // await particleAuth.logout()
  particleAuth.init(
    particleAuth.ChainInfo.PolygonMainnet,
    particleAuth.Env.Production,
  );
  console.log('Device ID:', DeviceInfo.getUniqueIdSync());

  console.log('Checking if user is logged in');
  const result = await particleAuth.isLogin();
  console.log(result);
  if (result) {
    var account = await particleAuth.getUserInfo();
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
        } else return 0;
      })
      .then(data => {
        name = data;
      });

    global.loginAccount = new PNAccount(email, name, address, uuid);
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
          return 0;
        }
      })
      .then(data => {
        const address = data;
        fetch(
          `https://user.api.xade.finance/polygon?address=${address.toLowerCase()}`,
          {
            method: 'GET',
          },
        )
          .then(response => {
            if (response.status == 200) {
              return response.text();
            } else return 0;
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
                console.log(types[i]);
                console.log(
                  await particleConnect.isConnected(types[i], address),
                );
                if (await particleConnect.isConnected(types[i], address)) {
                  global.connectAccount = new PNAccount(
                    types[i],
                    name,
                    address,
                    uuid,
                  );
                  global.withAuth = false;
                  global.walletType = types[i];
                  console.log('Logged In:', global.connectAccount);
                  navigation.navigate('Payments');
                  console.log('Navigating To Payments');
                  await particleConnect.reconnectIfNeeded(types[i], address);
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
