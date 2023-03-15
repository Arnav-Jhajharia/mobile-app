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
} from 'react-native';
import {Text} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import styles from './payments-styles';
import {Icon} from 'react-native-elements';
import {useEffect} from 'react';
import * as particleAuth from 'react-native-particle-auth';
import createProvider from '../../../particle-auth';
import {EventsCarousel} from './eventsCarousel';
import ABI from './XUSD';
// import { PROJECT_ID, CLIENT_KEY } from 'react-native-dotenv'
const PROJECT_ID = '260df770-44b4-4afd-a408-0a9f2b9944a9'
const CLIENT_KEY = 'c2HUrCSv7ymat5zCKhD41B9BA8bsRIFJgAXM0Jlm'
let web3;
let authAddress;

// import {signAndSendTransactionConnect} from '../../particle-connect';
// import { POLYGON_API_KEY } from "@env";
const contractAddress = '0xA3C957f5119eF3304c69dBB61d878798B3F239D9';
const images = [
  {
    name: 'DeriveX',
    color: '#C7FFD6',
    details: 'Trade 5000+ markets',
    image:
      'https://res.cloudinary.com/dcrfpsiiq/image/upload/v1678125002/Activity_uw71pf.png',
  },
  {
    name: 'RemmiteX',
    color: '#C7FFD6',
    details: 'Global payments',
    image:
      'https://res.cloudinary.com/dcrfpsiiq/image/upload/v1678125075/Arrow_qgmwic.png',
  },
  {
    name: 'SabeX',
    color: '#C7FFD6',
    details: 'Stable savings',
    image:
      'https://res.cloudinary.com/dcrfpsiiq/image/upload/v1678125032/Wallet_eriqpx.png',
  },
  
  // {},
  // {}
];
const PaymentsComponent = ({navigation}) => {
  const [state, setState] = React.useState([
    {truth: true, to: '0', from: '0', value: 0},
  ]);
  const [address, setAddress] = useState('0x');
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    console.log('Is Auth:', global.withAuth);

    const test = async web3 => {
      const contract = new web3.eth.Contract(ABI, contractAddress);

      async function getTokenBalance() {
        let result = await contract.methods
          .balanceOf(global.loginAccount.publicAddress)
          .call();
        const formattedResult = web3.utils.fromWei(result, 'ether');
        console.log('Auth Balance:', formattedResult);
        setBalance(formattedResult);
      }

      getTokenBalance();
    };

    if (global.withAuth) {
      authAddress = global.loginAccount.publicAddress;
      console.log('Global Account:', global.loginAccount);
      web3 = this.createProvider(
        PROJECT_ID,
        CLIENT_KEY
      );
      test(web3);
       console.log(web3.eth.getAccounts());
    } else { 
      authAddress = global.connectAccount.publicAddress;
      console.log('Global Account:', global.connectAccount);
      console.log('Global Wallet Type:', global.walletType);
      // this.signAndSendTransactionConnect(
      //   '0xb02ccaf699f4708b348d2915e40a1fa31a2b4279',
      //   '1000000000000000',
      // );
      fetch(
        `https://api-testnet.polygonscan.com/api?module=account&action=tokenBalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=26UDEN3Z37KX5V7PS9UMGHU11WAJ38RZ57`,
      )
        .then(response => response.json())
        .then(data => {
          const balance = data.result;
          const etherValue = web3.utils.fromWei(balance, 'ether');
          setBalance(etherValue);
          console.log('Connect Balance:', etherValue);
        });
    }

    fetch(
      `https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${authAddress}&apikey=26UDEN3Z37KX5V7PS9UMGHU11WAJ38RZ57`,
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
            const json = {
              truth: authAddress.toString().toLowerCase() == res.to, // true while accepting
              to: res.to,
              from: res.from,
              value: etherValue,
              date: formattedDate,
            };
            arr.push(json);
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

    // fetch(
    //   `https://api-testnet.polygonscan.com/api?module=account&action=tokenBalance&contractaddress=${contractAddress}&address=${authAddress}&tag=latest&apikey=26UDEN3Z37KX5V7PS9UMGHU11WAJ38RZ57`,
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     const balance = data.result;
    //     const etherValue = Web3.utils.fromWei(balance, 'ether');
    //     //  setBalance(etherValue);
    //     //     console.log(etherValue);
    //   });
  }, []);
  const t = true; // it means to send]
  // console.log('Address: ', address);
  // console.log('State: ', state);

  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <View colors={['#222222', '#000']} style={styles.container}>
        <View style={styles.topbar}>
          <Text style={styles.logo}>Payments</Text>
        </View>
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
                marginTop: '5%',
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
              {'.'}
              {balance.split('.')[1] ? balance.split('.')[1] : '00'}
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
              navigation.navigate('ComingSoon');
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
        <EventsCarousel images={images} navigation={navigation} />
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

export default PaymentsComponent;
