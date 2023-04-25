import React, {useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Video from 'react-native-video';
import {signAndSendTransactionConnect} from '../../../particle-connect';
import * as particleAuth from 'react-native-particle-auth';
import * as particleConnect from 'react-native-particle-connect';
import getOnlyProvider from '../../../particle-auth';
import createConnectProvider from '../../../particle-connect';
import {transferUSDC, transferUSDCV2 } from '../../loggedIn/payments/remmitexv1';
const Web3 = require('web3');
import AsyncStorage from '@react-native-async-storage/async-storage';
let web3;
let provider;
const successVideo = require('./pending.mov');
import { REMMITEX_TESTNET_CONTRACT } from '@env'
// const amount = "0"
export default function Component({route, navigation}) {

  const {walletAddress, emailAddress, mobileNumber, type, amount} =
    route.params;
  console.log('Params:', route.params);
  const weiVal = Web3.utils.toWei(amount.toString(), 'ether');
  useEffect(() => {
    if (global.withAuth) {
      authAddress = global.loginAccount.publicAddress;
      console.log('Global Account:', global.loginAccount);
      web3 = this.createProvider();
      const provider = this.getOnlyProvider();
    } else {
      authAddress = global.connectAccount.publicAddress;
      console.log('Global Account:', global.connectAccount);
      console.log('Global Wallet Type:', global.walletType);
      web3 = this.createConnectProvider();
    }

    const transaction = async () => {
      const mainnetJSON = await AsyncStorage.getItem('mainnet');
      const mainnet = JSON.parse(mainnetJSON);
      let status;
      console.log('Is Auth:', global.withAuth);
      if (type !== 'v2') {
        
        if (global.withAuth) {
        
          // authAddress = global.loginAccount.publicAddress;
          // console.log('Global Account:', global.loginAccount);
          // status = await this.signAndSendTransaction(walletAddress, weiVal);
          // console.log('TX1:', status);
          if(mainnet)
          {
          try {
            status = await transferUSDC(
              global.smartAccount,
              provider,
              amount,
              walletAddress,
            );
            console.log(status);
            if (status)
              navigation.navigate('Successful', {
                status,
                type,
                emailAddress,
                walletAddress,
                amount,
              });
            else navigation.navigate('Unsuccessful');
            ``;
          } catch (err) {
            console.log(err);
          }
        }
        else {

          status = await this.signAndSendTransaction(walletAddress, weiVal);
          console.log('TX1:', status);
          
          if (status !== false)
            navigation.navigate('Successful', {
              status,
              type,
              emailAddress,
              walletAddress,
              amount,
            });
          else navigation.navigate('Unsuccessful');
        }
        } else {
          authAddress = global.connectAccount.publicAddress;
          console.log('Global Account:', global.connectAccount);
          status = await this.signAndSendTransactionConnect(
            walletAddress,
            weiVal,
          );
          console.log('TX1:', status);
          if (status !== false)
            navigation.navigate('Successful', {
              status,
              type,
              emailAddress,
              walletAddress,
              amount,
            });
          else navigation.navigate('Unsuccessful');
        }
      } else {
        console.log('V2 being nicely executed')
        //V2 code goes here
        
        if(mainnet == false)
        {
          console.log('this part fine also')
          if(global.withAuth) {
          authAddress = global.loginAccount.publicAddress;
          console.log('Global Account:', global.loginAccount);
          status = await this.signAndSendTransaction(REMMITEX_TESTNET_CONTRACT, weiVal);
          console.log('TX1:', status);
          }
          else {
            authAddress = global.connectAccount.publicAddress;
            console.log('Global Account:', global.connectAccount);
            status = await this.signAndSendTransactionConnect(
              REMMITEX_TESTNET_CONTRACT,
              weiVal,
            );
          }
          if (status !== false)
          {
            navigation.navigate('Successful', {
              status,
              type,
              emailAddress,
              walletAddress,
              amount,
            });
          }
          
        }
        else
        {
          try {
          console.log('Reaching to state of calling function', global.smartAccount)
          status = await transferUSDCV2(
            global.smartAccount,
            provider,
            amount,
            walletAddress,
          );
          console.log(status);
          if (status)
            navigation.navigate('Successful', {
              status,
              type,
              emailAddress,
              walletAddress,
              amount,
            });
          else navigation.navigate('Unsuccessful');  
        } 
        catch(e)
        {
          console.log(e);
        }
        }
        
      }
    };

    transaction();
  }, []);

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#0C0C0C'}}>
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
      <View style={{width: '80%', marginTop: '30%', marginLeft: '12%'}}>
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
      {type == 'v2' ? (
        <TouchableOpacity>
     

          <Text
            style={{
              color: '#fff',
              fontSize: 15,
              // marginTop: '20%',
              textAlign: 'center',
              fontFamily: 'VelaSans-Bold',
            }}>
            We will let you know when the recipient has recieved the money.
          </Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
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
