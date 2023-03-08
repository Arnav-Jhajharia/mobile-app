import React, {useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-elements';
import Video from 'react-native-video';
import {signAndSendTransactionConnect} from '../../../particle-connect';
import * as particleAuth from 'react-native-particle-auth';
import * as particleConnect from 'react-native-particle-connect';
const Web3 = require('web3');

const successVideo = require('./pending.mp4');

export default function Component({route, navigation}) {
  const {amount, walletAddress, emailAddress, mobileNumber} = route.params;
  const weiVal = Web3.utils.toWei(amount.toString(), 'ether');
  useEffect(() => {
    const transaction = async () => {
      let status;
      console.log('Is Auth:', global.withAuth);
      if (global.withAuth) {
        authAddress = global.loginAccount.publicAddress;
        console.log('Global Account:', global.loginAccount);
        status = await this.signAndSendTransaction(walletAddress, weiVal);
        if (status) navigation.navigate('Successful');
        else navigation.navigate('Unsuccessful');
      } else {
        authAddress = global.connectAccount.publicAddress;
        console.log('Global Account:', global.connectAccount);
        status = await this.signAndSendTransactionConnect(
          walletAddress,
          weiVal,
        );
        if (status) navigation.navigate('Successful');
        else navigation.navigate('Unsuccessful');
      }
    };

    transaction();
  }, []);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#151515'}}>
      <Text
        style={{
          color: '#fff',
          fontSize: 30,
          marginTop: '20%',
          textAlign: 'center',
          fontFamily: 'NeueMachina-UltraBold',
        }}>
        Transaction Pending...
      </Text>
      <View style={{width: '80%', marginTop: '30%', marginLeft: '11%'}}>
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
      <TouchableOpacity onPress={() => navigation.navigate('Payments')}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            marginTop: '20%',
            textAlign: 'center',
            fontFamily: 'VelaSans-Bold',
          }}>
          Return Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/*

      const sender = await particleAuth.getAddress();
      const receiver = '0x1a2eaf515a6ca05bfab9bf3d9850ea29e5c7882e';
      const amount = '1';
      const chainInfo = await particleAuth.getChainInfo();
      console.log(chainInfo);
      let transaction = '';
      if (chainInfo.chain_name.toLowerCase() == 'solana') {
        transaction = await Helper.getSolanaTransaction(sender);
      } else {
        transaction = await getEvmTokenTransaction({sender, receiver, amount});
      }
      console.log(transaction);
      const result = await particleAuth.signAndSendTransaction(transaction);
      if (result.status) {
        const signature = result.data;
        console.log(signature);
      } else {
        const error = result.data;
        console.log(error);
      }
            */
