import React, {PureComponent} from 'react';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import {
  ChainInfo,
  LoginType,
  SupportAuthType,
  iOSModalPresentStyle,
  Env,
  Language,
} from 'react-native-particle-auth';
import * as particleAuth from 'react-native-particle-auth';
import {NavigationContainer} from '@react-navigation/native';

import {Button} from '@rneui/themed';
import * as Helper from './Helper';

init = async () => {
  const chainInfo = ChainInfo.PolygonMainnet;
  const env = Env.Production;
  particleAuth.init(chainInfo, env);
};

setChainInfo = async () => {
  const chainInfo = ChainInfo.PolygonMainnet;
  const result = await particleAuth.setChainInfo(chainInfo);
  console.log(result);
};

setChainInfoAsync = async () => {
  const chainInfo = ChainInfo.CeloTestnet;
  const result = await particleAuth.setChainInfoAsync(chainInfo);
  console.log(result);
};

login = async () => {
  const type = LoginType.Email;
  const supportAuthType = [
    SupportAuthType.Phone,
    SupportAuthType.Google,
    SupportAuthType.Apple,
    SupportAuthType.Linkedin,
    SupportAuthType.Github,
  ];
  const result = await particleAuth.login(type, '', supportAuthType, undefined);
  if (result.status) {
    const userInfo = result.data;
    console.log(userInfo);
  } else {
    const error = result.data;
    console.log(error);
  }
};

logout = async navigation => {
  const result = await particleAuth.logout();
  console.log('Logged out successfully');
};

isLogin = async () => {
  const result = await particleAuth.isLogin();
  return result;
};

signMessage = async () => {
  const message = 'Hello world!';
  const result = await particleAuth.signMessage(message);
  if (result.status) {
    const signedMessage = result.data;
    console.log(signedMessage);
  } else {
    const error = result.data;
    console.log(error);
  }
};

signTransaction = async () => {
  const chainInfo = await particleAuth.getChainInfo();
  if (chainInfo.chain_name.toLowerCase() != 'solana') {
    console.log('signTransaction only supports solana');
    return;
  }
  const sender = await particleAuth.getAddress();
  console.log('sender: ', sender);
  const transaction = await Helper.getSolanaTransaction(sender);
  console.log('transaction:', transaction);
  const result = await particleAuth.signTransaction(transaction);
  if (result.status) {
    const signedTransaction = result.data;
    console.log(signedTransaction);
  } else {
    const error = result.data;
    console.log(error);
  }
};

signAllTransactions = async () => {
  const chainInfo = await particleAuth.getChainInfo();
  if (chainInfo.chain_name.toLowerCase() != 'solana') {
    console.log('signAllTransactions only supports solana');
    return;
  }
  const sender = await particleAuth.getAddress();
  const transaction1 = await Helper.getSolanaTransaction(sender);
  const transaction2 = await Helper.getSplTokenTransaction(sender);
  const transactions = [transaction1, transaction2];
  const result = await particleAuth.signAllTransactions(transactions);
  if (result.status) {
    const signedTransactions = result.data;
    console.log(signedTransactions);
  } else {
    const error = result.data;
    console.log(error);
  }
};

signAndSendTransaction = async () => {
  const sender = await particleAuth.getAddress();
  const chainInfo = await particleAuth.getChainInfo();
  let transaction = '';
  if (chainInfo.chain_name.toLowerCase() == 'solana') {
    transaction = await Helper.getSolanaTransaction(sender);
  } else {
    transaction = await Helper.getEthereumTransacion(sender);
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
};

signTypedData = async () => {
  const chainInfo = await particleAuth.getChainInfo();
  if (chainInfo.chain_name.toLowerCase() == 'solana') {
    console.log('signTypedData only supports evm');
    return;
  }
  const typedData =
    '[    {    "type":"string",    "name":"Message",    "value":"Hi, Alice!"    },    {    "type":"uint32",    "name":"A nunmber",    "value":"1337"    }]';

  const version = 'v1';

  const result = await particleAuth.signTypedData(typedData, version);
  if (result.status) {
    const signature = result.data;
    console.log(signature);
  } else {
    const error = result.data;
    console.log(error);
  }
};

openAccountAndSecurity = async () => {
  const result = await particleAuth.openAccountAndSecurity();
  if (result.status) {
    const data = result.data;
    console.log(data);
  } else {
    const error = result.data;
    console.log(error);
  }
};

getAddress = async () => {
  const address = await particleAuth.getAddress();
  console.log(address);
};

getUserInfo = async () => {
  const result = await particleAuth.getUserInfo();
  const userInfo = JSON.parse(result);
  console.log(userInfo);
};

setModalPresentStyle = async () => {
  const style = iOSModalPresentStyle.FormSheet;
  particleAuth.setModalPresentStyle(style);
};

setMediumScreen = async () => {
  const isMedium = true;
  particleAuth.setMediumScreen(isMedium);
};

setLanguage = async () => {
  const language = Language.EN;
  particleAuth.setLanguage(language);
};

setDisplayWallet = async () => {
  const isDisplay = true;
  particleAuth.setDisplayWallet(isDisplay);
};

openWebWallet = async () => {
  particleAuth.openWebWallet();
};

getChainInfo = async () => {
  const result = await particleAuth.getChainInfo();
  console.log(result);
};

onClickLogin = async navigation => {
  await this.init();
  navigation.navigate('Loading');
  await this.setChainInfo();
  await this.login();
  const result = await particleAuth.isLogin();
  console.log('Result:', result);
  if (result) {
    navigation.navigate('LoggedIn');
  } else {
    navigation.navigate('Error');
  }
};

const data = [
  {key: 'Init', function: this.init},
  {key: 'SetChainInfo', function: this.setChainInfo},
  {key: 'SetChainInfoAsync', function: this.setChainInfoAsync},
  {key: 'Login', function: this.login},
  {key: 'Logout', function: this.logout},
  {key: 'IsLogin', function: this.isLogin},
  {key: 'SignMessage', function: this.signMessage},
  {key: 'SignTransaction', function: this.signTransaction},
  {key: 'SignAllTransactions', function: this.signAllTransactions},
  {key: 'SignAndSendTransaction', function: this.signAndSendTransaction},
  {key: 'SignTypedData', function: this.signTypedData},
  {key: 'OpenAccountAndSecurity', function: this.openAccountAndSecurity},
  {key: 'GetAddress', function: this.getAddress},
  {key: 'GetUserInfo', function: this.getUserInfo},
  {key: 'SetModalPresentStyle', function: this.setModalPresentStyle},
  {key: 'SetMediumScreen', function: this.setMediumScreen},
  {key: 'SetLanguage', function: this.setLanguage},
  {key: 'SetDisplayWallet', function: this.setDisplayWallet},
  {key: 'OpenWebWallet', function: this.openWebWallet},
  {key: 'GetChainInfo', function: this.getChainInfo},
];

export default {onClickLogin, openWebWallet, logout};
/*
export default class ParticleAuth extends PureComponent {
  render = () => {
    return (
      <SafeAreaView>
        <View>
          <FlatList data={data} renderItem={({item}) => <Item item={item} />} />
        </View>
      </SafeAreaView>
    );
  };
}

const Item = ({item}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button
        title={item.key}
        onPress={item.function}
        buttonStyle
        containerStyle
      />
    </View>
  );
};
*/
