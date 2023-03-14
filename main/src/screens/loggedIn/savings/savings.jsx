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
// import { PROJECT_ID, CLIENT_KEY } from '@env'y
// import { PROJECT_ID, CLIENT_KEY } from 'react-native-dotenv'
const PROJECT_ID = '260df770-44b4-4afd-a408-0a9f2b9944a9'
const CLIENT_KEY = 'c2HUrCSv7ymat5zCKhD41B9BA8bsRIFJgAXM0Jlm'
let web3;
const Savings = ({navigation}) => {
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
            style={{color: 'white', fontSize: 20, fontFamily: 'VelaSans-Bold'}}>
            Transactions
          </Text>
          {/* <Text style = {{color: 'grey', fontSize: 20}}>See all</Text> */}
        </View>
        {/* This is supposed to be a loop */}
        {/* ... */}
      </View>
    </SafeAreaView>
  );
};

export default Savings;
