import React, {Component, useEffect, useState} from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  Button,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import {Text} from '@rneui/themed';
import {Icon} from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';

const bg = require('../../../assets/bg.png');
const windowHeight = Dimensions.get('window').height;

const registerDB = async ({navigation, name}) => {
  if (global.withAuth) {
    global.loginAccount.name = name;
    const address = global.loginAccount.publicAddress;
    const email = global.loginAccount.phoneEmail;
    const uuid = global.loginAccount.uiud;

    fetch('https://mongo.api.xade.finance/polygon', {
      method: 'POST',
      body: `address:${address.toLowerCase()}||${uuid}`,
    });
    if (email[0] != '+') {
      const login_type = '';
      const object = {
        email: email.toLowerCase(),
        name: name,
        profileImage: '',
        verifier: '',
        verifierId: '',
        typeOfLogin: '',
        id: uuid,
      };

            
      fetch(`https://amtsend.api.xade.finance?email=${email.toLowerCase()}&address=${address.toLowerCase()}`)
      .then(response => 
        response.text())
      .then(data => console.log(data))
      
      const json = JSON.stringify(object || {}, null, 2);
      console.log('Request Being Sent:', json);
      
      fetch('https://mongo.api.xade.finance/polygon', {
        method: 'POST',
        body: json,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        console.log('Sent:', response.text());
      }).catch(error => {
        console.error(error);
      });
      
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
      fetch('https://mongo.api.xade.finance/polygon', {
        method: 'POST',
        body: data
      });
    }
    // const url = 'https://notifs.api.xade.finance/registerDevice';
    // const token = await AsyncStorage.getItem('token');

    navigation.push('Payments');
  } else {
    global.connectAccount.name = name;
    const address = global.connectAccount.publicAddress;
    const email = global.connectAccount.phoneEmail;
    const uuid = global.connectAccount.uiud;

    fetch('https://mongo.api.xade.finance/polygon', {
      method: 'POST',
      body: `address:${address.toLowerCase()}||${uuid}`,
    });
    if (email[0] != '+') {
      const login_type = '';

      const object = {
        email: email.toLowerCase(),
        name: name,
        profileImage: '',
        verifier: '',
        verifierId: '',
        typeOfLogin: '',
        id: uuid,
      };
      
      const json = JSON.stringify(object || {}, null, 2);
      console.log('Request Being Sent:', json);
      
      fetch('https://mongo.api.xade.finance/polygon', {
        method: 'POST',
        body: json,
        headers: {
          'Content-Type': 'application/json'
        }

      }).then(response => {
        console.log('Sent:', response.text());
      }).catch(error => {
        console.error(error);
      });

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
      fetch('https://mongo.api.xade.finance/polygon', {
  method: 'POST',
  body: data
});
    }
    const url = 'https://notifs.api.xade.finance/registerDevice';
    const token = await AsyncStorage.getItem('token');
    const notifsdata = {
      walletAddress: address.toLowerCase(),
      deviceToken: token,
    };
    console.log('req being sent');
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notifsdata),
    })
      .then(response => {
        if (!response.ok) {
          console.log(response);
          throw new Error('Network response was not ok');
        }
        // console.log(response.json());
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('There was an error:', error);
      });

    navigation.push('Payments');
  }
};

const Name = ({navigation}) => {
  const [name, setName] = useState('');

  return (
    <View style={styles.black}>
      <ScrollView>
        <View style={styles.mainContent}>
          <View style={styles.mainPrompt}>
            <Text style={styles.mainText}>What shall we call{'\n'}you?</Text>
            <Text style={styles.subText}>Enter your name to continue</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: '5%',
            }}>
            <Image
              style={styles.avatar}
              source={require('../../../assets/avatar.png')}
            />
            <Image
              style={styles.avatarSecondary}
              source={require('../../../assets/avatar2.png')}
            />
            <Image
              style={styles.avatarMain}
              source={require('../../../assets/avatar3.png')}
            />
            <Image
              style={styles.avatarSecondary}
              source={require('../../../assets/avatar4.png')}
            />
            <Image
              style={styles.avatar}
              source={require('../../../assets/avatar5.png')}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputText}>Username</Text>
            <TextInput
              style={styles.mainInput}
              placeholderTextColor={'grey'}
              placeholder={'Tap to add name'}
              value={name}
              onChangeText={newText => {
                setName(newText);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Text style={styles.tos}>
          By tapping the button(s) below, you agree to the{' '}
          <Text
            style={{color: '#fff', fontFamily: 'VelaSans-Bold'}}
            onPress={() => {
              Linking.openURL(`https://www.xade.finance`);
            }}>
            Terms Of Service
          </Text>{' '}
          &
          <Text
            style={{color: '#fff', fontFamily: 'VelaSans-Bold'}}
            onPress={() => {
              Linking.openURL(`https://www.xade.finance`);
            }}>
            {'\n'}Privacy Policy
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.continue}
          onPress={() => {
            // navigation.navigate('Payments');
            registerDB({navigation, name});
          }}>
          <Text style={styles.continueText}>Let's go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  black: {
    width: '100%',
    backgroundColor: '#0C0C0C',
    height: '100%',
  },

  mainContent: {
    width: '100%',
    marginTop: '15%',
  },

  mainPrompt: {
    marginLeft: '5%',
  },

  mainText: {
    color: '#fff',
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 35,
  },

  subText: {
    marginTop: '5%',
    color: '#D4D4D4',
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 17,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },

  avatarSecondary: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },

  avatarMain: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },

  input: {
    marginLeft: '5%',
    width: '100%',
    marginTop: '10%',
  },

  inputText: {
    fontSize: 17,
    fontFamily: 'EuclidCircularA-Regular',
    color: '#D4D4D4',
  },

  mainInput: {
    fontSize: 30,
    marginTop: '3%',
    fontFamily: 'EuclidCircularA-Regular',
    color: '#D4D4D4',
  },

  tos: {
    color: '#B9B9B9',
    fontFamily: 'VelaSans-Bold',
    textAlign: 'center',
    fontSize: 10,
  },

  bottom: {
    marginBottom: '10%',
  },

  continue: {
    width: '88%',
    marginLeft: '6%',
    backgroundColor: '#D4D4D4',
    paddingTop: '3.5%',
    paddingBottom: '3.5%',
    marginTop: '10%',
    borderRadius: 100,
  },

  continueText: {
    color: '#0C0C0C',
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 18,
    textAlign: 'center',
  },

  skip: {
    width: '88%',
    marginLeft: '6%',
    paddingTop: '3.5%',
    paddingBottom: '3.5%',
    marginTop: '2%',
    borderRadius: 100,
  },

  skipText: {
    color: '#F0F0F0',
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Name;
