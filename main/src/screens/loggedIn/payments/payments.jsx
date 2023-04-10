import React, {useState} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Clipboard,
  Alert,
  Modal,
  Linking,
  Dimensions,
} from 'react-native';
import {Text} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import styles from './payments-styles';
import {Icon} from 'react-native-elements';
import {useEffect} from 'react';
import * as particleAuth from 'react-native-particle-auth';
import * as particleConnect from 'react-native-particle-connect';
import createProvider from '../../../particle-auth';
import createConnectProvider from '../../../particle-connect';
import {EventsCarousel} from './eventsCarousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import XUSD_ABI from './XUSD';
import USDC_ABI from './USDC';
import {SABEX_LP} from '@env';
// import {POLYGON_API_KEY} from '@env';

// const windowHeight = Dimensions.get('window').height;

let web3;
const REMMITEX_CONTRACT = '0xf1Ff5c85df29f573003328c783b8c6f8cC326EB7';
const windowHeight = Dimensions.get('window').height;
// import {signAndSendTransactionConnecumbait} from '../../particle-connect';
import {POLYGON_API_KEY} from '@env';
import { registerFcmToken } from '../../../utils/push';
const contractAddress = '0xA3C957f5119eF3304c69dBB61d878798B3F239D9';
const usdcAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';
const images = [
  {
    name: 'Quests',
    color: '#C7FFD6',
    details: 'Get Xade tokens and amazing rewards for free',
    image:
      'https://res.cloudinary.com/xade-finance/image/upload/v1680888638/gift-dynamic-premium_mol5y6.png',
  },
  {
    name: 'Subscribe',
    color: '#C7FFD6',
    details: 'To feel premium experience & get exclusive perks',
    image:
      'https://res.cloudinary.com/xade-finance/image/upload/v1680888637/crow-dynamic-premium_bwfohj.png',
  },
  {
    name: 'Contribute',
    color: '#C7FFD6',
    details: 'Use Xade app & write a review to win Xade Tokens',
    image:
      'https://res.cloudinary.com/xade-finance/image/upload/v1680888637/megaphone-dynamic-premium_tvtubx.png',
  },
  {
    name: 'Referrals',
    color: '#C7FFD6',
    details: 'Invite your friends to Xade and win exclusive rewards',
    image:
      'https://res.cloudinary.com/xade-finance/image/upload/v1680888637/notify-heart-dynamic-premium_rtjfgq.png',
  },
  // {},
  // {}
];
const PaymentsComponent = ({navigation}) => {
  // async function test() {
  //   if (global.withAuth) {
  //     authAddress = global.loginAccount.publicAddress;
  //     console.log('Global Account:', global.loginAccount);
  //     const result = await particleAuth.setChainInfoAsync(
  //       particleAuth.ChainInfo.PolygonMainnet,
  //     );
  //     console.log(result);
  //     web3 = this.createProvider();
  //   } else {
  //     authAddress = global.connectAccount.publicAddress;
  //     console.log('Global Account:', global.connectAccount);
  //     console.log('Global Wallet Type:', global.walletType);
  //     web3 = this.createConnectProvider();
  //   }
  //   const contract = new web3.eth.Contract(ABI, contractAddress);
  //   const result = await contract.methods.balanceOf(authAddress).call();
  //   const decimals = await contract.methods.decimals().call();
  //   const formattedResult = parseInt(result) / 10 ** decimals;
  //   setBalance(formattedResult);
  // }
  // fetch(
  //   `https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${global.loginAccount.publicAddress}&apikey=${POLYGON_API_KEY}`,
  // )
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data.message != 'NOTOK') {
  //       //console.log(data.message);
  //       //         console.log(data);
  //       const result = data.result;
  //       let len = result.length;
  //       let arr = [];
  //       let date = [];
  //       for (let i = 0; i < len; i++) {
  //         let res = result[i];
  //         let val = res.value;
  //         const etherValue = web3.utils.fromWei(val, 'ether');
  //         var pubDate = new Date(res.timeStamp * 1000);
  //         var weekday = new Array(
  //           'Sun',
  //           'Mon',
  //           'Tue',
  //           'Wed',
  //           'Thu',
  //           'Fri',
  //           'Sat',
  //         );
  //         var monthname = new Array(
  //           'Jan',
  //           'Feb',
  //           'Mar',
  //           'Apr',
  //           'May',
  //           'Jun',
  //           'Jul',
  //           'Aug',
  //           'Sep',
  //           'Oct',
  //           'Nov',
  //           'Dec',
  //         );
  //         var formattedDate =
  //           monthname[pubDate.getMonth()] +
  //           ' ' +
  //           pubDate.getDate() +
  //           ', ' +
  //           pubDate.getFullYear();
  //         const truth =
  //           REMMITEX_CONTRACT.toLowerCase() == res.to
  //             ? 2
  //             : authAddress.toString().toLowerCase() == res.to
  //             ? 1
  //             : 0;
  //         const json = {
  //           truth: truth, // true while accepting
  //           to: res.to == SABEX_LP.toLowerCase() ? 'SabeX Deposit' : res.to,
  //           from:
  //             res.from == SABEX_LP.toLowerCase()
  //               ? 'SabeX Withdrawal'
  //               : res.from,
  //           value: etherValue,
  //           date: formattedDate,
  //           hash: res.hash,
  //         };
  //         date.push(formattedDate);
  //         arr.push(json);
  //       }
  //       setDates([...new Set(date)].reverse());
  //       setState(arr.reverse());
  //       // console.log(dates);
  //       console.log(state);
  //     } else {
  //       setState([]);
  //       setDates([]);
  //       return;
  //     }
  //   });
  // test();

  const [state, setState] = React.useState([
    {truth: true, to: '0', from: '0', value: 0, hash: ''},
  ]);
  const [dates, setDates] = React.useState([]);
  const [address, setAddress] = useState('0x');
  const [balance, setBalance] = useState('0');
  const [transactionVisible, setTransactionVisible] = useState(false);
  const [mainnet, setMainnet] = useState(false);
  useEffect(() => {
    console.log('Is Auth:', global.withAuth);
    
    const getBalance = async (web3, address) => {
      const mainnetJSON = await AsyncStorage.getItem('mainnet')
      const _mainnet = JSON.parse(mainnetJSON)
      const _address = await AsyncStorage.getItem('address')
      setMainnet(_mainnet);
      setAddress(_address);
      console.log("Mainnet: " + _mainnet)
      if (_mainnet) {
        if (global.withAuth) {
          await particleAuth.setChainInfoAsync(
            particleAuth.ChainInfo.PolygonMainnet,
          );
        } else {
          await particleConnect.setChainInfoAsync(
            particleConnect.ChainInfo.PolygonMainnet,
          );
        }
        const contract = new web3.eth.Contract(USDC_ABI, usdcAddress);
        async function getTokenBalance() {
          let result = await contract.methods.balanceOf(address).call();
          const decimals = await contract.methods.decimals().call();
          const formattedResult = parseInt(result) / 10 ** decimals;
          console.log('Balance:', formattedResult);
          setBalance(formattedResult.toString());
        }
        getTokenBalance();
      } else {
        if (global.withAuth) {
          await particleAuth.setChainInfoAsync(
            particleAuth.ChainInfo.PolygonMumbai,
          );
        } else {
          await particleConnect.setChainInfoAsync(
            particleConnect.ChainInfo.PolygonMumbai,
          );
        }
        const contract = new web3.eth.Contract(XUSD_ABI, contractAddress);
        async function getTokenBalance() {
          let result = await contract.methods.balanceOf(address).call();
          const formattedResult = web3.utils.fromWei(result, 'ether');
          console.log('Balance:', formattedResult);
          setBalance(formattedResult.toString());
        }
        getTokenBalance();
      }
    };

    if (global.withAuth) {
      authAddress = global.loginAccount.publicAddress;
      console.log('Global Account:', global.loginAccount);
      web3 = this.createProvider();
      getBalance(web3, authAddress);
      //  console.log(web3.eth.getAccounts());
    } else {
      authAddress = global.connectAccount.publicAddress;
      console.log('Global Account:', global.connectAccount);
      console.log('Global Wallet Type:', global.walletType);
      web3 = this.createConnectProvider();
      getBalance(web3, authAddress);
      // this.signAndSendTransactionConnect(
      //   '0xb02ccaf699f4708b348d2915e40a1fa31a2b4279',
      //   '1000000000000000',
      // );
    }

    async function registration()
    {
      console.log('req being sent')
      await registerFcmToken(authAddress);
    }

    registration();
    

    async function registration()
    {
      console.log('req being sent')
      await registerFcmToken(authAddress);
    }

    registration();
    

    if (mainnet) {
      fetch(
        `https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=${usdcAddress}&address=${authAddress}&apikey=${POLYGON_API_KEY}`,
      )
        .then(response => response.json())
        .then(data => {
          if (data.message != 'NOTOK') {
            //console.log(data.message);
            //         console.log(data);
            const result = data.result;
            //        console.log('Arnav:', result);
            let len = result.length;

            let arr = [];
            let date = [];
            for (let i = 0; i < len; i++) {
              let res = result[i];
              let val = res.value;
              const decimals = 6;
              const etherValue = parseInt(val) / 10 ** decimals;
              var pubDate = new Date(res.timeStamp * 1000);
              var weekday = new Array(
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
              );

              var monthname = new Array(
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              );

              var formattedDate =
                monthname[pubDate.getMonth()] +
                ' ' +
                pubDate.getDate() +
                ', ' +
                pubDate.getFullYear();
              const truth =
                REMMITEX_CONTRACT.toLowerCase() == res.to
                  ? 2
                  : authAddress.toString().toLowerCase() == res.to
                  ? 1
                  : 0;
              const json = {
                truth: truth, // true while accepting
                to: res.to == SABEX_LP.toLowerCase() ? 'SabeX Deposit' : res.to,
                from:
                  res.from == SABEX_LP.toLowerCase()
                    ? 'SabeX Withdrawal'
                    : res.from,
                value: etherValue,
                date: formattedDate,
                hash: res.hash,
              };
              date.push(formattedDate);
              // console.log(date);
              // console.log(json);
              arr.push(json);
              // console.log(authAddress, res.to, json.truth);
            }
            //    console.log(json);
            setDates([...new Set(date)].reverse());
            setState(arr.reverse());
            // console.log(dates);
            // console.log(state);
          } else {
            setState([]);
            setDates([]);
            return;
          }
        });
    } else {
      fetch(
        `https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${authAddress}&apikey=${POLYGON_API_KEY}`,
      )
        .then(response => response.json())
        .then(data => {
          if (data.message != 'NOTOK') {
            //console.log(data.message);
            //         console.log(data);
            const result = data.result;
            //        console.log('Arnav:', result);
            let len = result.length;

            let arr = [];
            let date = [];
            for (let i = 0; i < len; i++) {
              let res = result[i];
              let val = res.value;
              const etherValue = web3.utils.fromWei(val, 'ether');
              var pubDate = new Date(res.timeStamp * 1000);
              var weekday = new Array(
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat',
              );

              var monthname = new Array(
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              );

              var formattedDate =
                monthname[pubDate.getMonth()] +
                ' ' +
                pubDate.getDate() +
                ', ' +
                pubDate.getFullYear();
              const truth =
                REMMITEX_CONTRACT.toLowerCase() == res.to
                  ? 2
                  : authAddress.toString().toLowerCase() == res.to
                  ? 1
                  : 0;
              const json = {
                truth: truth, // true while accepting
                to: res.to == SABEX_LP.toLowerCase() ? 'SabeX Deposit' : res.to,
                from:
                  res.from == SABEX_LP.toLowerCase()
                    ? 'SabeX Withdrawal'
                    : res.from,
                value: etherValue,
                date: formattedDate,
                hash: res.hash,
              };
              date.push(formattedDate);
              // console.log(date);
              // console.log(json);
              arr.push(json);
              // console.log(authAddress, res.to, json.truth);
            }
            //    console.log(json);
            setDates([...new Set(date)].reverse());
            setState(arr.reverse());
            // console.log(dates);
            // console.log(state);
          } else {
            setState([]);
            setDates([]);
            return;
          }
        });
    }
  }, []);
  const t = true;
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <View colors={['#222222', '#000']} style={styles.container}>
        <View style={styles.topbar}>
          <Text style={styles.logo}>Payments</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon
              // style={styles.tup}
              name={'settings'}
              size={30}
              color={'#fff'}
              type="material"
              // style = {{marginRight: '1%'}}
            />
          </TouchableOpacity>
          {/* <Modal
            animationType="fade"
            visible={notificationVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setNotificiationsVisible(!notificationVisible);
            }}>
            <View style={{height: windowHeight, backgroundColor: '#0C0C0C'}}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginTop: '15%',
                    marginLeft: '5%',
                  }}>
                  <Text
                    style={{
                      color: '#F0F0F0',
                      fontSize: 25,
                      fontFamily: 'EuclidCircularA-Medium',
                    }}>
                    Notifications
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setNotificiationsVisible(!notificationVisible)
                    }>
                    <Icon
                      name={'keyboard-backspace'}
                      size={30}
                      color={'#f0f0f0'}
                      type="materialicons"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: '50%'}}>
                  <Text style={styles.noTransaction}>
                    Your Notifications Appear Here
                  </Text>
                </View>
              </ScrollView>
            </View>
          </Modal> */}
        </View>
        <View style={styles.fontContainer}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text
              style={{
                color: '#6D797D',
                fontSize: 50,
                fontFamily: 'Benzin-Medium',
              }}>
              $
            </Text>
            <Text
              style={{
                marginTop: '5%',
                color: 'white',
                fontSize: 50,
                fontFamily: 'Benzin-Medium',
              }}>
              {balance.split('.')[0]}
              <Text
                style={{
                  color: '#6D797D',
                  fontSize: 35,
                  fontFamily: 'Benzin-Medium',
                  marginBottom: 5,
                }}>
                {'.'}
                {balance.split('.')[1] ? balance.split('.')[1] : '00'}
              </Text>
            </Text>
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'VelaSans-Bold',
            }}>
            Your checking balance
          </Text>
        </View>

        <View
          style={{
            marginTop: '5%',
            width: '90%',
            height: 50,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={styles.depWith}
            onPress={() => {
              navigation.navigate('SendEmail');
            }}>
            <LinearGradient
              colors={['#1D2426', '#383838']}
              useAngle
              angle={45}
              angleCenter={{x: 0.5, y: 0.5}}
              style={styles.innerDep}>
              <Icon
                // style={styles.tup}
                name={'paper-plane'}
                size={20}
                color={'#86969A'}
                type="font-awesome"
                // style = {{marginRight: '1%'}}
              />
              <Text style={{color: '#86969A', fontFamily: 'VelaSans-Bold'}}>
                Send
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.depWith}
            onPress={() => {
              navigation.navigate('FiatRamps');
            }}>
            <LinearGradient
              colors={['#1D2426', '#383838']}
              useAngle
              angle={45}
              angleCenter={{x: 0.5, y: 0.5}}
              style={styles.innerDep}>
              <Icon
                // style={styles.tup}
                name={'plus'}
                // size={40}
                color={'#86969A'}
                type="feather"
              />
              <Text style={{color: '#86969A', fontFamily: 'VelaSans-Bold'}}>
                Deposit
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.depWith}
            onPress={() => {
              navigation.navigate('QRScreen');
            }}>
            <LinearGradient
              colors={['#1D2426', '#383838']}
              useAngle
              angle={45}
              angleCenter={{x: 0.5, y: 0.5}}
              style={styles.innerDep}>
              <Icon name={'qr-code'} color={'#86969A'} type="ionicons" />
              <Text style={{color: '#86969A', fontFamily: 'VelaSans-Bold'}}>
                Scan
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.exploreContainer}>
        <View style={styles.heading}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'VelaSans-Bold',
              // marginTop:'10%'
            }}>
            Explore Features
          </Text>
          {/* <Text style = {{color: 'grey', fontSize: 20}}>See all</Text> */}
        </View>
        {/* <View style = {{width: '90%', height: '10%'}}> */}
        <EventsCarousel images={images} navigation={navigation} address={address} />
        {/* </View> */}
      </View>
      <View style={styles.transactionContainer}>
        <View style={styles.heading}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: 'VelaSans-Bold',
            }}>
            Transactions
          </Text>
          <TouchableOpacity
            onPress={() => {
              setTransactionVisible(true);
            }}>
            <Text
              style={{
                color: '#87C4FF',
                fontFamily: 'VelaSans-Bold',
                fontSize: 15,
                padding: 5,
              }}>
              View All
            </Text>
          </TouchableOpacity>
          {/* <Text style = {{color: 'grey', fontSize: 20}}>See all</Text> */}
        </View>
        <Modal
          animationType="slide"
          visible={transactionVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setTransactionVisible(!transactionVisible);
          }}>
          <View style={{backgroundColor: '#0C0C0C'}}>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  marginTop: '15%',
                  marginLeft: '5%',
                  marginBottom: '2%',
                }}>
                <Text
                  style={{
                    color: '#F0F0F0',
                    fontSize: 25,
                    fontFamily: 'EuclidCircularA-Medium',
                  }}>
                  Your Transactions
                </Text>
                <TouchableOpacity
                  onPress={() => setTransactionVisible(!transactionVisible)}>
                  <Icon
                    name={'keyboard-backspace'}
                    size={30}
                    color={'#f0f0f0'}
                    type="materialicons"
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: '7%'}}>
                {dates.length > 0 ? (
                  // state.map(json => {
                  dates.map(date => {
                    // return state.map(json => {
                    var today = new Date();

                    var weekday = new Array(
                      'Sun',
                      'Mon',
                      'Tue',
                      'Wed',
                      'Thu',
                      'Fri',
                      'Sat',
                    );

                    var monthname = new Array(
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    );

                    var formattedDate =
                      monthname[today.getMonth()] +
                      ' ' +
                      today.getDate() +
                      ', ' +
                      today.getFullYear();
                    let transactions = [];
                    Object.keys(state).forEach(key => {
                      if (
                        state[key].date == date &&
                        !transactions.includes(state[key])
                      ) {
                        transactions.push(state[key]);
                      }
                    });
                    // console.log(transactions);
                    return (
                      <View>
                        <Text style={styles.dates}>
                          {date == formattedDate ? 'Today' : date}
                        </Text>
                        {transactions.map(json => {
                          return (
                            <View style={styles.transactions}>
                              <View style={styles.transactionLeft}>
                                <Image
                                  source={
                                    json.truth
                                      ? require('./icon/positive.png')
                                      : require('./icon/negative.png')
                                  }
                                  style={{
                                    borderWidth: 0,
                                    width: 60,
                                    height: 60,
                                  }}
                                />
                                <View style={{margin: 10}}>
                                  <TouchableHighlight
                                    onPress={() => {
                                      Linking.openURL(
                                        `https://mumbai.polygonscan.com/tx/${json.hash}`,
                                      );
                                    }}>
                                    <Text
                                      style={{
                                        color: 'white',
                                        fontFamily: 'VelaSans-Bold',
                                        fontSize: 15,
                                      }}>
                                      {(json.truth ? json.from : json.to).slice(
                                        0,
                                        16,
                                      )}
                                      ...
                                    </Text>
                                  </TouchableHighlight>

                                  <Text
                                    style={{
                                      color: 'grey',
                                      fontFamily: 'VelaSans-Bold',
                                      fontSize: 13,
                                    }}>
                                    {json.date}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.transactionRight}>
                                <Text
                                  style={{
                                    color: json.truth ? '#4EE58B' : '#E14C4C',
                                    fontSize: 20,
                                    fontFamily: 'VelaSans-Bold',
                                  }}>
                                  {json.truth ? '+' : '-'}
                                  {json.value}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })
                ) : (
                  <View>
                    <Text style={styles.noTransaction}>
                      Your Transactions Appear Here
                    </Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </Modal>
        {state.length > 0 ? (
          state.slice(0, 10).map(json => {
            // console.log(groupedState);
            return (
              <View style={styles.transactions}>
                <View style={styles.transactionLeft}>
                  <Image
                    source={
                      json.truth == 2
                        ? require('./icon/pending.png')
                        : json.truth == 1
                        ? require('./icon/positive.png')
                        : require('./icon/negative.png')
                    }
                    style={{
                      borderWidth: 0,
                      width: 60,
                      height: 60,
                    }}
                  />
                  <View style={styles.ttext}>
                    <TouchableHighlight
                      onPress={() => {
                        Clipboard.setString(json.truth ? json.from : json.to);
                        Alert.alert('Copied Address To Clipboard');
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'EuclidCircularA-Medium',
                          fontSize: 15,
                        }}>
                        {(json.truth ? json.from : json.to).slice(0, 16)}...
                      </Text>
                    </TouchableHighlight>

                    <Text
                      style={{
                        color: 'grey',
                        fontFamily: 'EuclidCircularA-Medium',
                      }}>
                      {json.date}
                    </Text>
                  </View>
                </View>

                <View style={styles.transactionRight}>
                  <Text
                    style={{
                      color: json.truth ? '#4EE58B' : '#E14C4C',
                      fontSize: 20,
                      fontFamily: 'EuclidCircularA-Medium',
                    }}>
                    {json.truth != 0 && json.truth != 2 ? '+' : '-'}
                    {json.value}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <View>
            <Text style={styles.noTransaction}>
              Your Transactions Appear Here
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PaymentsComponent;
