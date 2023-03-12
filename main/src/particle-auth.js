import {
  ChainInfo,
  LoginType,
  SupportAuthType,
  Env,
} from 'react-native-particle-auth';
import * as particleAuth from 'react-native-particle-auth';
import {PNAccount} from './Models/PNAccount';
import * as Helper from './helper';

import Web3 from 'web3';
import {ParticleProvider} from 'react-native-particle-auth';

createProvider = (projectId, clientKey) => {
  const provider = new ParticleProvider({projectId, clientKey});
  const web3 = new Web3(provider);
  return web3;
};

web3_getAccounts = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('web3.eth.getAccounts', accounts);
};

init = async () => {
  const chainInfo = ChainInfo.PolygonMumbai;
  const env = Env.Production;
  particleAuth.init(chainInfo, env);
};

setChainInfo = async () => {
  const chainInfo = ChainInfo.PolygonMumbai;
  const result = await particleAuth.setChainInfo(chainInfo);
  console.log(result);
};

login = async () => {
  const type = LoginType.Email;
  const supportAuthType = [SupportAuthType.Phone, SupportAuthType.Google];
  const result = await particleAuth.login(type, '', supportAuthType, undefined);
  const account = result.data;
  if (result.status) {
    const email = account.email
      ? account.email
      : account.googleEmail
      ? account.googleEmail
      : account.phone;
    const name = account.name ? account.name : 'Not Set';
    const address = await particleAuth.getAddress();
    global.loginAccount = new PNAccount(email, name, address);
    global.withAuth = true;
    const userInfo = result.data;
    console.log('User Info:', userInfo);
    const uuid = userInfo.wallets[0].uuid;
    console.log('User Info:', userInfo);
    fetch('https://mongo.api.xade.finance/polygon', {
      method: 'POST',
      body: `address:${address.toLowerCase()}||${uuid}`,
    });
    if (email[0] != '+') {
      const login_type = '';
      const object = {
        email: email,
        name: email,
        profileImage: '',
        verifier: '',
        verifierId: '',
        typeOfLogin: '',
        id: uuid,
      };
      console.log(object);
      const json = JSON.stringify(object || {}, null, 2);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://mongo.api.xade.finance/polygon');
      xhr.send(json);
      console.log(json);
    } else {
      let secret = '';
      let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < 50; i++) {
        secret += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      console.log('Condition is not not working!');
      let phone = email.replace('+', '');
      let data = `{"phone":"${phone}","id":"${secret}"}`;
      let s = new XMLHttpRequest();
      s.open('POST', 'https://mongo.api.xade.finance/polygon');
      s.send(data);
    }
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
    // transaction = await Helper.getEthereumTransacion(sender);
    // transaction = await Helper.getEvmTokenTransaction(sender);
    transaction = await Helper.getEvmTokenTransaction(sender, receiver, amount);
  }
  console.log(transaction);
  const result = await particleAuth.signAndSendTransaction(transaction);
  if (result.status) {
    const signature = result.data;
    console.log(signature);
    return true;
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
    navigation.navigate('Payments');
  } else {
    navigation.navigate('Error');
  }

  console.log('Public Address:', global.loginAccount);
};

export default {
  init,
  createProvider,
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
