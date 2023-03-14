import React, {useEffect, useState} from 'react';
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
import ethProvider from './integration/ethProvider';
import {REACT_APP_ALCHEMY_URL} from '@env';
import Web3 from 'web3';

const alchemories = REACT_APP_ALCHEMY_URL;
const Savings = ({navigation}) => {
  const t = true;
  const provider = new Web3(alchemories);
  const address = global.loginAccount.publicAddress;
  const {getUserPoolBalance} = ethProvider(provider, address, 80081);
  const [balance, setBalance] = useState(1);
  useEffect(() => {
    setBalance(getUserPoolBalance());
    console.log(balance);
  }, []);
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
              {/* {balance.split('.')[0]} */}
            </Text>
            <Text
              style={{
                color: '#6D797D',
                fontSize: 30,
                fontFamily: 'Benzin-Medium',
                marginBottom: 5,
              }}>
              {/* {'.'}
              {balance.split('.')[1] ? balance.split('.')[1] : '00'} */}
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
            onPress={() =>
              navigation.navigate('EnterSavingsAmount', {widthdraw: false})
            }>
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
            onPress={() =>
              navigation.navigate('EnterSavingsAmount', {widthdraw: true})
            }>
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
              <Image source={require('./img/dollar-dollar-color.png')} />

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
              <Image source={require('./img/chart-dynamics.png')} />
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
