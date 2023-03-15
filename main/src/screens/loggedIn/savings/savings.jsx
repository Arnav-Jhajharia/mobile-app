import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  View,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import {Text} from '@rneui/themed';
import CountDown from 'react-native-countdown-component';
import LinearGradient from 'react-native-linear-gradient';
import styles from './savings-styles';
import {Icon} from 'react-native-elements';
import ethProvider from './integration/ethProvider'
// import { PROJECT_ID, CLIENT_KEY, POLYGON_API_KEY } from '@env'
// import { PROJECT_ID, CLIENT_KEY } from 'react-native-dotenv'
const PROJECT_ID = '260df770-44b4-4afd-a408-0a9f2b9944a9'
const CLIENT_KEY = 'c2HUrCSv7ymat5zCKhD41B9BA8bsRIFJgAXM0Jlm'
let web3;
const contractAddress = '0xA3C957f5119eF3304c69dBB61d878798B3F239D9';

const Savings = ({navigation}) => {
  const [state, setState] = React.useState([
    {truth: true, to: '0', from: '0', value: 0},
  ]);
  const t = true;
  // const provider = Web3(ALCHEMY_URL)
  const address = global.loginAccount.publicAddress;
  web3 = this.createProvider(
    PROJECT_ID,
    CLIENT_KEY
  );
  const { getUserPoolBalance } = ethProvider(web3)
  const [balance, setBalance] = useState('0.0')
  useEffect(async () => {
    const balance = await getUserPoolBalance();
    console.log(balance)
    setBalance(balance)
  
    if (global.withAuth) {
      authAddress = global.loginAccount.publicAddress;
      console.log('Global Account:', global.loginAccount);
      web3 = this.createProvider();
      test(web3, authAddress);
      //  console.log(web3.eth.getAccounts());
    } else {
      authAddress = global.connectAccount.publicAddress;
      console.log('Global Account:', global.connectAccount);
      console.log('Global Wallet Type:', global.walletType);
      web3 = this.createConnectProvider();
      test(web3, authAddress);
      // this.signAndSendTransactionConnect(
      //   '0xb02ccaf699f4708b348d2915e40a1fa31a2b4279',
      //   '1000000000000000',
      // );
    }

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
              if(res.to==SABEX_LP || res.from==SABEX_LP)
              {
            const json = {
              truth: authAddress.toString().toLowerCase() == res.to, // true while accepting
              to: res.to == SABEX_LP ? 'SabeX Deposit' : res.to,
              from: res.from == SABEX_LP ? 'SabeX Withdrawal' : res.from,
              value: etherValue,
              date: formattedDate,
            };
            arr.push(json);
          }
            // console.log(authAddress, res.to, json.truth);
          }
          //    console.log(json);
          setState(arr.reverse());
          // console.log(data.result);
        } else {
          console.log('Condition is working');
          setState([]);
          return;
        }
      });

  }, [])
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <View style={styles.topbar}>
        <Text style={styles.logo}>Savings</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.fontContainer}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text
              style={{
                color: '#6D797D',
                fontSize: 45,
                fontFamily: 'Benzin-Medium',
              }}>
              $
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 45,
                fontFamily: 'Benzin-Medium',
              }}>
              {balance.split('.')[0]} 
            </Text>
            <Text
              style={{
                color: '#6D797D',
                fontSize: 30,
                fontFamily: 'Benzin-Medium',
                marginBottom: 5,
              }}>
              {'.'}{balance.split('.')[1] ? balance.split('.')[1] : '00'}
            </Text>
          </View>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'VelaSans-Medium',
            }}>
            Total amount deposited
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            height: 50,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={styles.depWith}
            onPress={() => navigation.navigate('EnterSavingsAmount', {widthdraw: false})}>
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
            onPress={() => navigation.navigate('EnterSavingsAmount', {withdraw: true})}>
            <LinearGradient
              colors={['#1D2426', '#383838']}
              useAngle
              angle={45}
              angleCenter={{x: 0.5, y: 0.5}}
              style={styles.innerDep}>
              <Icon
                // style={styles.tup}
                name={'angle-down'}
                color={'#86969A'}
                // size={40}
                // color={t?'green': 'red'}
                type="font-awesome"
              />
              <Text style={{color: '#86969A', fontFamily: 'VelaSans-Bold'}}>
                Withdraw
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            height: 232,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={styles.depWith}>
            <LinearGradient
              colors={['#1D2426', '#383838']}
              useAngle
              angle={45}
              angleCenter={{x: 0.5, y: 0.5}}
              style={styles.innerDep2}>
              <Image
                source={require('./img/dollar-dollar-color.png')}
                style={{borderWidth: 1}}
              />

              <Text style={styles.amountText}>$1,836.25</Text>
              <Text style={styles.amountText2}>Interest earned</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.depWith}>
            <LinearGradient
              colors={['#1D2426', '#383838']}
              useAngle
              angle={45}
              angleCenter={{x: 0.5, y: 0.5}}
              style={styles.innerDep2}>
              <Image
                source={require('./img/chart-dynamics.png')}
                style={{borderWidth: 1}}
              />
              <Text style={styles.amountText}>7.1%</Text>
              <Text style={styles.amountText2}>APY on Feb 25</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
          {/* <Text style = {{color: 'grey', fontSize: 20}}>See all</Text> */}
        </View>
        {state.length > 0 ? (
          state.map(json => {
            // console.log(state);
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
                  <View style={styles.ttext}>
                    <TouchableHighlight
                      onPress={() => {
                        Clipboard.setString(json.truth ? json.to : json.from);
                        Alert.alert('Copied Address To Clipboard');
                      }}>
                      <Text
                        style={{color: 'white', fontFamily: 'VelaSans-Bold'}}>
                        {(json.truth ? json.from : json.to).slice(0, 10)}...
                      </Text>
                    </TouchableHighlight>

                    <Text style={{color: 'grey', fontFamily: 'VelaSans-Bold'}}>
                      {json.date}
                    </Text>
                  </View>
                </View>

                <View style={styles.transactionRight}>
                  <Text
                    style={{
                      color: json.truth ? '#4EE58B' : 'red',
                      fontSize: 20,
                      fontFamily: 'VelaSans-Bold',
                    }}>
                    {json.truth ? '+' : '-'}
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

export default Savings;
