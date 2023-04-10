import React, {useState} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Button,
  Image,
  Animated,
  ScrollView,
  Clipboard,
  Dimensions,
  Alert,
  Easing,
  StyleSheet,
  Linking,
  Modal,
  ImageBackground,
} from 'react-native';
// import {Icon} from 'react-native-elements';
import * as particleAuth from 'react-native-particle-auth';
import * as particleConnect from 'react-native-particle-connect';

// import Clipboard from '@react-native-clipboard/clipboard';

const bg = require('../../../assets/choose.png');
const windowHeight = Dimensions.get('window').height;

import {Text} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import styles from './settings-styles';
import {Icon} from 'react-native-elements';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');

// import {EventsCarousel} from './eventsCarousel';
const HorizontalRule = () => {
  return <View style={ruleStyles.hr} />;
};

const ruleStyles = StyleSheet.create({
  hr: {
    borderBottomColor: 'rgba(125, 127, 124, 0.5)',
    borderBottomWidth: 1,
    marginVertical: 10,
    width: '100%',
    // marginTop: '0%',
  },
});

// import {signAndSendTransactionConnect} from '../../particle-connect';
let address;
let info;
let imageUrl;
const Component = ({navigation}) => {
  if (global.withAuth) {
    address = global.loginAccount.publicAddress;
    info = global.loginAccount.name;
    imageUrl = `https://ui-avatars.com/api/?name=${info}&format=png&rounded=true&bold=true&background=0C0C0C&color=ffbd59`;
  } else {
    address = global.connectAccount.publicAddress;
    info = global.connectAccount.name;
    imageUrl = `https://ui-avatars.com/api/?name=${info}&format=png&rounded=true&bold=true&background=000`;
  }
  const [amount, setAmount] = React.useState(0);
  const [networksVisible, setNetworksVisible] = React.useState(false);

  return (
    <SafeAreaView style={{width: '100%', height: '100%', alignItems: 'center'}}>
      <ScrollView
        style={{width: width}}
        contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.topbar}>
          <Text style={styles.logo}>Settings</Text>
        </View>

        <View style={styles.nameSettings}>
          <Image style={{width: 55, height: 55}} source={{uri: imageUrl}} />
          <View style={{width: '80%', marginLeft: '5%'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 23,
                fontFamily: 'EuclidCircularA-Medium',
              }}>
              {info}
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'EuclidCircularA-Medium',
                fontSize: 17,
              }}>
              {String(address.slice(0, 22)).toLowerCase()}...
            </Text>
          </View>
        </View>

        <View style={styles.events}>
          <View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://xadefinance.crew3.xyz/invite/OEL6nx6wDDIxAFsZVHPsv',
                );
              }}>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 10,
                }}
                source={require('./quests.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontFamily: 'EuclidCircularA-Medium',
                color: '#f0f0f0',
                marginTop: '4%',
              }}>
              Quests
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 10,
                }}
                source={require('./updates.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontFamily: 'EuclidCircularA-Medium',
                color: '#f0f0f0',
                marginTop: '4%',
              }}>
              Updates
            </Text>
          </View>
          <View>
            <TouchableOpacity>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 10,
                }}
                source={require('./invite.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontFamily: 'EuclidCircularA-Medium',
                color: '#f0f0f0',
                marginTop: '4%',
              }}>
              Referrals
            </Text>
          </View>
        </View>

        <View style={[styles.otherSettings, {marginTop: 50, marginBottom: 20}]}>
          <TouchableOpacity
            style={styles.innerSettings}
            onPress={() => Linking.openURL('mailto:developmet@xade.finance')}>
            <Image
              style={{width: 40, height: 40, borderRadius: 10}}
              source={require('./contact.png')}
            />
            <View style={styles.actualSetting}>
              {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'EuclidCircularA-Medium'}}>{info.slice(0, 20)}...</Text> */}
              <Text style={styles.settingsText}>Contact Us</Text>
              <Icon
                // style={styles.tup}
                name={'angle-right'}
                size={20}
                color={'#86969A'}
                type="font-awesome"
                // style = {{marginRight: '1%'}}
              />
            </View>
          </TouchableOpacity>
          <HorizontalRule />

          <TouchableOpacity
            style={styles.innerSettings}
            onPress={() => {
              Linking.openURL('https://t.me/xadefi');
            }}>
            <Image
              style={{width: 40, height: 40, borderRadius: 10}}
              source={require('./support.png')}
            />
            <View style={styles.actualSetting}>
              {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'EuclidCircularA-Medium'}}>{info.slice(0, 20)}...</Text> */}
              <Text style={styles.settingsText}>Help and Support</Text>
              <Icon
                // style={styles.tup}
                name={'angle-right'}
                size={20}
                color={'#86969A'}
                type="font-awesome"
                // style = {{marginRight: '1%'}}
              />
            </View>
          </TouchableOpacity>
          <HorizontalRule />

          <TouchableOpacity
            style={styles.innerSettings}
            onPress={() => {
              Linking.openURL('https://docs.xade.finance');
            }}>
            <Image
              style={{width: 40, height: 40, borderRadius: 10}}
              source={require('./docs.png')}
            />
            <View style={styles.actualSetting}>
              {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'EuclidCircularA-Medium'}}>{info.slice(0, 20)}...</Text> */}
              <Text style={styles.settingsText}>Docs</Text>
              <Icon
                // style={styles.tup}
                name={'angle-right'}
                size={20}
                color={'#86969A'}
                type="font-awesome"
                // style = {{marginRight: '1%'}}
              />
            </View>
          </TouchableOpacity>

          {/* <HorizontalRule /> */}
        </View>
        <View style={[styles.otherSettings, {marginBottom: 20}]}>
          <TouchableOpacity
            style={styles.innerSettings}
            onPress={() => {
              Linking.openURL('https://xade.finance/privacy-policy');
            }}>
            <Image
              style={{width: 40, height: 40, borderRadius: 10}}
              source={require('./privacy-policy.png')}
            />
            <View style={styles.actualSetting}>
              {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'EuclidCircularA-Medium'}}>{info.slice(0, 20)}...</Text> */}
              <Text style={styles.settingsText}>Privacy Policy</Text>
              <Icon
                // style={styles.tup}
                name={'angle-right'}
                size={20}
                color={'#86969A'}
                type="font-awesome"
                // style = {{marginRight: '1%'}}
              />
            </View>
          </TouchableOpacity>
          <HorizontalRule />
          <TouchableOpacity
            style={styles.innerSettings}
            onPress={() => {
              Linking.openURL('https://xade.finance/terms-of-service');
            }}>
            <Image
              style={{width: 40, height: 40, borderRadius: 10}}
              source={require('./tos.png')}
            />
            <View style={styles.actualSetting}>
              {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'EuclidCircularA-Medium'}}>{info.slice(0, 20)}...</Text> */}
              <Text style={styles.settingsText}>Terms of Service</Text>
              <Icon
                // style={styles.tup}
                name={'angle-right'}
                size={20}
                color={'#86969A'}
                type="font-awesome"
                // style = {{marginRight: '1%'}}
              />
            </View>
          </TouchableOpacity>
          <HorizontalRule />
          <TouchableOpacity
            style={styles.innerSettings}
            onPress={() => {
              setNetworksVisible(true);
            }}>
            <Image
              style={{width: 40, height: 40, borderRadius: 10}}
              source={require('./network.png')}
            />
            <View style={styles.actualSetting}>
              <Text style={styles.settingsText}>
                {/* Switch To {global.mainnet ? 'Testnet' : 'Mainnet'} */}
                Networks
              </Text>
              <Icon
                // style={styles.tup}
                name={'angle-right'}
                size={20}
                color={'#86969A'}
                type="font-awesome"
                // style = {{marginRight: '1%'}}
              />
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            visible={networksVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setNetworksVisible(!networksVisible);
            }}>
            <ImageBackground source={bg} style={modalStyles.bg}>
              <SafeAreaView>
                <ScrollView>
                  <View style={modalStyles.container}>
                    <View style={modalStyles.topbar}>
                      <Text style={modalStyles.logo}>XADE</Text>
                      <TouchableOpacity
                        style={{marginTop: '1%'}}
                        onPress={() => setNetworksVisible(!networksVisible)}>
                        <Icon
                          name={'close'}
                          size={30}
                          color={'#f0f0f0'}
                          type="materialicons"
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={modalStyles.mainContent}>
                      <Text style={modalStyles.mainText}>Choose Network:</Text>
                      <View style={modalStyles.buttonContent}>
                        <TouchableOpacity
                          style={modalStyles.button}
                          onPress={async () => {
                            global.mainnet = true;
                            await AsyncStorage.setItem('mainnet', JSON.stringify(true))
                            console.log('Switching To Mainnet');
                            console.log(
                              await particleAuth.setChainInfoAsync(
                                particleAuth.ChainInfo.PolygonMainnet,
                              ),
                            );
                            setNetworksVisible(!networksVisible);
                            navigation.push('Payments');
                          }}>
                          <Text style={modalStyles.buttonText}>
                            Switch To Mainnet
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={modalStyles.buttonAlt}
                          onPress={async () => {
                            global.mainnet = false;
                            await AsyncStorage.setItem('mainnet', JSON.stringify(false))
                            console.log('Switching To Testnet');
                            console.log(
                              await particleAuth.setChainInfoAsync(
                                particleAuth.ChainInfo.PolygonMumbai,
                              ),
                            );
                            setNetworksVisible(!networksVisible);
                            navigation.push('Payments');
                          }}>
                          <Text style={modalStyles.buttonTextAlt}>
                            Switch To Testnet
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </ImageBackground>
          </Modal>
        </View>
        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            global.withAuth
              ? particleAuth.fastLogout()
              : particleConnect.disconnect();
            navigation.push('LoggedOutHome');
            console.log('Logged Out/Disconnected Successfully');
          }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.socialMedia}>
          <View style={styles.innerMedia}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://xade.finance');
              }}>
              <Icon
                name={'web'}
                size={35}
                color={'#898989'}
                type="material-community"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.innerMedia}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://twitter.com/XadeFinance');
              }}>
              <Icon
                name={'twitter'}
                size={30}
                color={'#00acee'}
                type="antdesign"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.innerMedia}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://discord.gg/VxuKdRRzmN');
              }}>
              <Icon
                name={'discord'}
                size={30}
                color={'#7289da'}
                type="material-community"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.innerMedia}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://youtube.com/@xadefinance');
              }}>
              <Icon
                name={'youtube'}
                size={40}
                color={'#c4302b'}
                type="material-community"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.innerMedia}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://www.reddit.com/r/XadeFinance/');
              }}>
              <Icon
                name={'reddit'}
                size={35}
                color={'#ff4500'}
                type="material-community"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={{color: '#898989', marginBottom: '15%'}}>v1.1.1</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Component;

const modalStyles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },

  container: {
    width: '100%',
    height: windowHeight,
  },

  topbar: {
    width: '90%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logo: {
    fontFamily: 'LemonMilk-Regular',
    color: '#fff',
    fontSize: 30,
    marginLeft: '8%',
  },

  mainContent: {
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: '15%',
  },

  mainText: {
    color: '#fff',
    fontFamily: 'VelaSans-ExtraBold',
    fontSize: 25,
    width: '100%',
    textAlign: 'center',
  },

  buttonContent: {
    width: '100%',
    backgroundColor: 'transparent',
    marginTop: '30%',
  },

  button: {
    width: '70%',
    color: '#0C0C0C',
    borderRadius: 50,
    marginLeft: '15%',
    marginTop: '7%',
    padding: '4%',
    backgroundColor: 'white',
    borderWidth: 2.5,
  },

  buttonText: {
    color: '#0C0C0C',
    fontFamily: 'VelaSans-Bold',
    fontSize: 15,
    textAlign: 'center',
  },

  buttonAlt: {
    width: '70%',
    color: '#fff',
    borderRadius: 50,
    marginLeft: '15%',
    marginTop: '10%',
    padding: '4%',
    backgroundColor: '#0C0C0C',
    borderWidth: 2.5,
  },

  buttonTextAlt: {
    color: '#fff',
    fontFamily: 'VelaSans-Bold',
    fontSize: 15,
    textAlign: 'center',
  },

  buttonIcon: {
    marginLeft: '80%',
  },
});
