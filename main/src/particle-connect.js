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

setChainInfo = async () => {
  const chainInfo = ChainInfo.PolygonMumbai;
  const result = await particleConnect.setChainInfo(chainInfo);
  console.log(result);
};

connect = async ({walleType}) => {
  console.log('Connect:', walleType);
  const result = await particleConnect.connect(walleType);
  if (result.status) {
    console.log('connect success');
    const account = result.data;
    const email = account.email ? account.email : 'Not Set';
    global.connectAccount = new PNAccount(
      walleType,
      'Not Set',
      account.publicAddress,
    );
    global.withAuth = false;
    const userInfo = result.data;
    console.log('User Info:', global.connectAccount);
    const uuid = userInfo.publicAddress;
    fetch('https://mongo.api.xade.finance/polygon', {
      method: 'POST',
      body: `address:${global.connectAccount.publicAddress.toLowerCase()}||${uuid}`,
    });
    const login_type = '';
    const object = {
      email: walleType,
      name: walleType,
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
    evm_url: 'https://rpc.particle.network/',
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

  console.log('Account Info:', account);

  console.log('Result:', result);
  if (result) {
    navigation.navigate('Payments');
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

export default {onClickConnect, disconnect, signAndSendTransactionConnect};
