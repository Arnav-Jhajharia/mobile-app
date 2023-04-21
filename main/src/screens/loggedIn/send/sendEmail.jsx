import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  View,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import {useState, useMemo, useEffect} from 'react';
import {Text} from '@rneui/themed';
import {Dropdown} from 'react-native-element-dropdown';
const REMMITEX_CONTRACT = '0x5c34A74caB1Edfc1d73B8Ae725AdDE50bA067d5B';

import {Icon} from 'react-native-elements';

const width = Dimensions.get('window').width;

const local_data = [
  {
    value: '1',
    lable: 'Email',
    image: require('./icon/email.png'),
  },
  {
    value: '2',
    lable: 'Wallet',
    image: require('./icon/wallet.png'),
  },
];
const SendEmailComponent = ({navigation}) => {
  const [country, setCountry] = useState('1');
  const [text, setText] = useState('');
  const handleSubmit = () => {
    if (country == 1) {
      // Email
      // if(!country.includes('@')) return;
      fetch(
        `https://emailfind.api.xade.finance/polygon?email=${text.toLowerCase()}`,
        {
          method: 'GET',
        },
      )
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            return response.text();
          } else return 0;
        })
        .then(data => {
          console.log(data);
          if (data != 0)
            navigation.navigate('EnterAmount', {
              type: 'email',
              walletAddress: data,
              emailAddress: text,
            });
          else {
            navigation.navigate('EnterAmount', {
              type: 'v2',
              walletAddress: REMMITEX_CONTRACT,
              emailAddress: text,
            });
          }
        });
    } else if (country == 2) {
      navigation.navigate('EnterAmount', {
        type: 'wallet',
        walletAddress: text,
      });
    } else console.log('How did we get here?');
  };

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Image source={item.image} style={styles.imageStyle} />
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: '5%',
          width: width,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        {/* <View style = {{alignSelf: 'flex-start'}}> */}
        <Icon
          name="arrow-left"
          style={{position: 'absolute', left: 0, display: 'none'}}
          // size={30}
          color="white"
          type="feather"
          onPress={() => navigation.navigate('Payments')}
        />
        {/* </View> */}
        <Text
          style={{
            width: width * 0.8,
            fontSize: 25,
            textAlign: 'center',
            fontFamily: 'VelaSans-Bold',
            color: 'white',
          }}>
          Enter{' '}
          {country == 1
            ? 'email'
            : country == 2
            ? 'wallet'
            : 'how did we get here?'}{' '}
          address
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.enterAmount}>
          <View style={styles.choose}>
            <Dropdown
              style={styles.dropdown}
              containerStyle={{
                backgroundColor: '#232E34',
                borderColor: '#232E34',
                width: '130%',
                paddingHorizontal: 12,
                paddingVertical: 5,
              }}
              itemContainerStyle={{
                borderBottomColor: '#232E34',
                paddingBottom: 2,
              }}
              data={local_data}
              labelField="label"
              valueField="value"
              value={'Email'}
              onChange={item => {
                setCountry(item.value);
              }}
              renderItem={renderItem}
            />
          </View>

          <View style={styles.enter}>
            <View style={{width: '100%'}}>
              <TextInput
                placeholderTextColor={'#4F636F'}
                placeholder={`Enter ${local_data[country - 1].lable} address`}
                onChangeText={newText => setText(newText)}
                defaultValue={text}
                style={{
                  fontFamily: 'VelaSans-Medium',
                  width: '100%',
                  color: 'white',
                  marginTop: 15,
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SendMobile')}
          style={styles.subText}>
          <Text style={{color: '#4F4CF6'}}>Send to mobile number instead</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
        <Text
          style={{color: 'white', fontFamily: 'VelaSans-Medium', fontSize: 18}}>
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  enterAmount: {
    flexDirection: 'row',
  },

  dropdown: {
    margin: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },

  imageStyle: {
    width: 30,
    height: 30,
    paddingTop: 5,
    backgroundColor: '#232E34',
  },

  container: {
    alignItems: 'center',
    width: '100%',
    marginTop: '60%',
  },

  enterAmount: {
    width: '80%',
    borderRadius: 40,
    height: 50,
    backgroundColor: '#232E34',
    flexDirection: 'row',
  },

  confirmButton: {
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
    height: 55,
    // borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 30,
    // color: 'white',
    backgroundColor: '#67CA83',
  },

  enter: {
    width: '80%',
  },

  subText: {
    marginTop: 15,
  },
});

export default SendEmailComponent;
