import React, {Component, useEffect} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  Button,
} from 'react-native';
import {Text} from '@rneui/themed';
import {Icon} from 'react-native-elements';
const Web3 = require('web3');
import {PNAccount} from '../../Models/PNAccount';

import * as particleAuth from 'react-native-particle-auth';

const bg = require('../../../assets/bg.png');
const windowHeight = Dimensions.get('window').height;

const StaticHomeScreen = ({navigation}) => {
  useEffect(() => {
    // LoginCheck({navigation});
  }, []);

  return (
    <ImageBackground source={bg} style={styles.bg}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.topbar}>
              <Text style={styles.logo}>XADE</Text>
            </View>
            <View style={styles.mainContent}>
              <Text style={styles.mainText}>
                One app{'\n'}
                to manage{'\n'}
                all your{'\n'}
                finances
              </Text>
              <Text style={styles.subText}>
                A financial super app powered{'\n'} by advanced DeFi protocols
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('Particle');
                }}>
                <Icon
                  style={styles.buttonIcon}
                  name="arrow-right"
                  size={30}
                  color="black"
                  type="feather"
                />
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
  },

  container: {
    width: '100%',
    height: '80%',
  },

  topbar: {
    width: '100%',
    backgroundColor: 'transparent',
  },

  logo: {
    fontFamily: 'LemonMilk-Regular',
    color: '#fff',
    fontSize: 30,
    marginLeft: '8%',
    marginTop: '2%',
  },

  mainContent: {
    width: '100%',
    backgroundColor: 'transparent',
  },

  mainText: {
    color: '#fff',
    fontFamily: 'VelaSans-Bold',
    fontSize: 54,
    width: '100%',
    marginTop: windowHeight / 8.0,
    marginLeft: '10%',
  },

  subText: {
    color: '#979797',
    fontFamily: 'VelaSans-Medium',
    fontSize: 20,
    width: '100%',
    marginLeft: '10%',
    marginTop: '8%',
  },

  button: {
    width: '75%',
    color: '#000',
    borderRadius: 15,
    marginLeft: '12%',
    marginTop: '15%',
    padding: '5%',
    backgroundColor: '#E8FF59',
    marginBottom: '5%',
  },

  buttonText: {
    color: '#000',
    fontFamily: 'VelaSans-Bold',
    fontSize: 20,
    marginTop: '-11.7%',
    marginLeft: '2%',
  },

  buttonIcon: {
    marginLeft: '80%',
  },
});

export default StaticHomeScreen;
