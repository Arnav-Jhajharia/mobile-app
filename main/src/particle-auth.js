import {
  ChainInfo,
  LoginType,
  SupportAuthType,
  Env,
} from 'react-native-particle-auth';
import * as particleAuth from 'react-native-particle-auth';
import {PNAccount} from './Models/PNAccount';
import * as Helper from './helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Web3 from 'web3';
import {ParticleProvider} from 'react-native-particle-auth';
import {PROJECT_ID, CLIENT_KEY} from '@env';

const projectId = PROJECT_ID;
const clientKey = CLIENT_KEY;

createProvider = () => {
  const provider = new ParticleProvider({projectId, clientKey});
  const web3 = new Web3(provider);
  return web3;
};

getOnlyProvider = () => {
  const provider = new ParticleProvider({projectId, clientKey});
  return provider;
};

web3_getAccounts = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('web3.eth.getAccounts', accounts);
};

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

login = async () => {
  const type = LoginType.Email;
  const supportAuthType = [SupportAuthType.Phone];
  const result = await particleAuth.login(type, '', supportAuthType, undefined);
  const account = result.data;
  if (result.status) {
    const email = account.email
      ? account.email
      : account.googleEmail
      ? account.googleEmail
      : account.phone;
    const name = account.name ? account.name : 'Not Set';
    const userInfo = result.data;
    const address = (await particleAuth.getAddress()).toLowerCase();
    await AsyncStorage.setItem('address', address);
    const uuid = userInfo.wallets[0].uuid
      ? userInfo.wallets[0].uuid
      : userInfo.uuid;
    console.log('User Info:', userInfo);
    global.loginAccount = new PNAccount(
      email.toLowerCase(),
      name,
      address,
      uuid,
    );
    global.withAuth = true;
  } else {
    const error = result.data;
    console.log('Error:', error);
  }
};

logout = async navigation => {
  const result = await particleAuth.logout();
  console.log('Logged out successfully');
};

getUserInfo = async () => {
  var userInfo = await particleAuth.getUserInfo();
  userInfo = JSON.parse(userInfo);
  console.log(userInfo);
};

signAndSendTransaction = async (receiver, amount) => {
  console.log(receiver, amount);
  const sender = await particleAuth.getAddress();
  const chainInfo = await particleAuth.getChainInfo();
  let transaction = '';
  if (chainInfo.chain_name.toLowerCase() == 'solana') {
    transaction = await Helper.getSolanaTransaction(sender);
  } else {
    transaction = await Helper.getEvmTokenTransaction(sender, receiver, amount);
  }
  console.log(transaction);
  const result = await particleAuth.signAndSendTransaction(transaction);
  if (result.status) {
    const signature = result.data;
    console.log('TX Hash:', signature);
    return signature;
  } else {
    const error = result.data;
    console.log(error);
    return false;
  }
};

openAccountAndSecurity = async () => {
  particleAuth.openAccountAndSecurity();
};

openWebWallet = async () => {
  particleAuth.openWebWallet();
};

onClickLogin = async navigation => {
  await this.init();

  navigation.navigate('Loading');

  await this.setChainInfo();
  await this.login();
  const result = await particleAuth.isLogin();

  console.log('Logged In:', result);
  if (result) {
    // navigation.navigate('EnterName');
    const address = global.loginAccount.publicAddress;
    const email = global.loginAccount.phoneEmail;
    const uuid = global.loginAccount.uiud;

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
        } else {
          navigation.navigate('EnterName');
        }
      })
      .then(data => {
        if (
          data == '' ||
          data.length == 0 ||
          data.toLowerCase() == email.toLowerCase() ||
          data == 'Not Set'
        ) {
          navigation.navigate('EnterName');
        } else {
          global.loginAccount.name = data;
          navigation.navigate('Payments');
        }
      });
  } else {
    navigation.navigate('Error');
  }

  console.log('Public Address:', global.loginAccount);
};

export default {
  init,
  createProvider,
  getOnlyProvider,
  onClickLogin,
  openWebWallet,
  signAndSendTransaction,
  getUserInfo,
  logout,
};
/*
const sender = await particleAuth.getAddress();
const chainInfo = await particleAuth.getChainInfo();
let transaction = '';
transaction = await Helper.getEthereumTransacion(sender);

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
