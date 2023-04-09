import * as particleConnect from 'react-native-particle-connect';
import {PNAccount} from './Models/PNAccount';
import * as Helper from './helper';
import {
  Env,
  LoginType,
  SupportAuthType,
  WalletType,
} from 'react-native-particle-connect';
import {ChainInfo} from 'react-native-particle-connect';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Web3 from 'web3';
import {ParticleConnectProvider} from 'react-native-particle-connect';
import {PROJECT_ID, CLIENT_KEY} from '@env';

var DeviceInfo = require('react-native-device-info');

const projectId = PROJECT_ID;
const clientKey = CLIENT_KEY;

createConnectProvider = () => {
  let walletType = global.walletType;
  const provider = new ParticleConnectProvider({
    projectId,
    clientKey,
    walletType,
  });
  const web3 = new Web3(provider);
  return web3;
};

setChainInfo = async () => {
  const chainInfo = ChainInfo.PolygonMumbai;
  const result = await particleConnect.setChainInfo(chainInfo);
  console.log(result);
};

connect = async ({walleType}) => {
  console.log('Connect:', walleType);
  const result = await particleConnect.connect(walleType);
  // console.log(result);
  if (result.status) {
    console.log('connect success');
    const account = result.data;
    const email = account.name;
    const uuid = DeviceInfo.getUniqueIdSync();
    const name = account.name ? account.name : 'Not Set';
    global.connectAccount = new PNAccount(
      name,
      walleType,
      account.publicAddress,
      uuid,
    );
    console.log(global.connectAccount);
    await AsyncStorage.setItem('address', account.publicAddress);
    global.withAuth = false;
    const userInfo = result.data;
    console.log('User Info:', global.connectAccount);
// <<<<<<< HEAD
    // const uuid = userInfo.publicAddress;
    // fetch('https://mongo.api.xade.finance/polygon', {
    //   method: 'POST',
    //   body: `address:${global.connectAccount.publicAddress.toLowerCase()}||${uuid}`,
    // });
    // const url = "https://notifs.api.xade.finance/registerDevice";
    // const token = await AsyncStorage.getItem('token')
    // const notifsdata = { 
    // walletAddress: global.connectAccount.publicAddress.toLowerCase(),
    // deviceToken: token
    // };
    // console.log('req being sent')
    // fetch(url, {
    // method: "POST",
    // headers: {
    //   "Content-Type": "application/json"
    // },
    // body: JSON.stringify(notifsdata)
    // })
    // .then(response => {
    // if (!response.ok) {
    //   console.log(response)
    //   throw new Error("Network response was not ok");
    // }
    // // console.log(response.json());
    // return response.json();
    // })
    // .then(data => {
    // console.log(data);
    // })
    // .catch(error => {
    // console.error("There was an error:", error);
    // });
    // const login_type = '';
    // const object = {
    //   email: walleType,
    //   name: walleType,
    //   profileImage: '',
    //   verifier: '',
    //   verifierId: '',
    //   typeOfLogin: '',
    //   id: uuid,
    // };
    // console.log(object);
    // const json = JSON.stringify(object || {}, null, 2);
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://mongo.api.xade.finance/polygon');
    // xhr.send(json);
    // console.log(json);
// =======
    //   fetch('https://mongo.api.xade.finance/polygon', {
    //     method: 'POST',
    //     body: `address:${global.connectAccount.publicAddress.toLowerCase()}||${uuid}`,
    //   });
    //   const login_type = '';
    //   const object = {
    //     email: walleType,
    //     name: walleType,
    //     profileImage: '',
    //     verifier: '',
    //     verifierId: '',
    //     typeOfLogin: '',
    //     id: uuid,
    //   };
    //   console.log(object);
    //   const json = JSON.stringify(object || {}, null, 2);
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('POST', 'https://mongo.api.xade.finance/polygon');
    //   xhr.send(json);
    //   console.log(json); }
// >>>>>>> d31a09b  1fd785f39612a6e0944d02705783ce0fd
  } else {
    const error = result.data;
    console.log('Error:', error);
  }
};
signAndSendTransactionConnect = async (receiver, amount) => {
  console.log(receiver, amount);
  const sender = global.connectAccount.publicAddress;
  const chainInfo = await particleConnect.getChainInfo();
  let transaction = '';
  if (chainInfo.chain_name.toLowerCase() == 'solana') {
    transaction = await Helper.getSolanaTransaction(sender);
  } else {
    // transaction = await Helper.getEthereumTransacion(sender);
    // transaction = await Helper.getEvmTokenTransaction(sender);
    transaction = await Helper.getEvmTokenTransaction(sender, receiver, amount);
  }
  console.log(transaction);
  const result = await particleConnect.signAndSendTransaction(
    global.walletType,
    global.connectAccount.publicAddress,
    transaction,
  );
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

onClickConnect = async ({navigation, walletype}) => {
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
    ChainInfo.PolygonMumbai,
    Env.Production,
    metadata,
    rpcUrl,
  );
  global.walletType = walletype;
  navigation.navigate('Loading');
  console.log('onClick:', walletype);

  var account = await this.connect({walleType: walletype});

  var result = await particleConnect.isConnected(
    walletype,
    global.connectAccount.publicAddress,
  );

  console.log('Account Info:', global.connectAccount);

  console.log('Result:', result);
  if (result) {
    // navigation.navigate('EnterName');
    // navigation.navigate('EnterName');
    const address = global.connectAccount.publicAddress;
    const email = global.connectAccount.phoneEmail;
    const uuid = global.connectAccount.uiud;
    
    await fetch(
      `https://user.api.xade.finance/polygon?address=${address.toLowerCase()}`,
      {
        method: 'GET',
      },
    )
      .then(response => {
        console.log(response);
        if (response.status == 200) {
          // console.log('Text:', response.text());
          return response.text();
        } else {
          navigation.navigate('EnterName');
        }
      })
      .then(data => {
        console.log('Data:', data);
        if (
          data == '' ||
          data.length == 0 ||
          data.toLowerCase() == email.toLowerCase() ||
          data == 'Not Set'
        ) {
          navigation.navigate('EnterName');
        } else {
          global.connectAccount.name = data;
          navigation.navigate('Payments');
        }
      });
  } else {
    navigation.navigate('Error');
  }

  //  uInfo = await particleConnect.getInfo();
  //  console.log('Public Address:', uInfo);
};

disconnect = async () => {
  const publicAddress = connectAccount.publicAddress;
  const result = await particleConnect.disconnect(walletType, publicAddress);
  if (result.status) {
    console.log(result.data);
    console.log('Disconnected successfully');
  } else {
    const error = result.data;
    console.log(error);
  }
};

export default {
  onClickConnect,
  disconnect,
  signAndSendTransactionConnect,
  createConnectProvider,
};
