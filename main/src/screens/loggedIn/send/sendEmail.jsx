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
} from 'react-native';
import {useState, useMemo, useEffect} from 'react';
import {Text} from '@rneui/themed';
import CountDown from 'react-native-countdown-component';
import LinearGradient from 'react-native-linear-gradient';
import {SelectCountry} from 'react-native-element-dropdown';

// import styles from './paymentsStyles'
// import { Picker, onOpen } from 'react-native-actions-sheet-picker';
import {Icon} from 'react-native-elements';
const windowWidth = Dimensions.get('window').width;
// const countries = [
//     {
//         "name": "Email Address",
//         "code": "AC",
//         "emoji": "🇦🇨",
//         "unicode": "U+1F1E6 U+1F1E8",
//         "image": "https://www.vigcenter.com/public/all/images/default-image.jpg"
//       },
//       {
//         "name": "Wallet address",
//         "code": "AD",
//         "emoji": "🇦🇩",
//         "unicode": "U+1F1E6 U+1F1E9",
//         "image": "https://www.vigcenter.com/public/all/images/default-image.jpg"
//       },
//   ];
const local_data = [
  {
    value: '1',
    lable: 'Email',
    image: {
      uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    },
  },
  {
    value: '2',
    lable: 'Wallet',
    image: {
      uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    },
  },
];
const SendEmailComponent = ({navigation}) => {
  // text != '' && (!(country == 1) || text.includes('@'))
  //   ? navigation.navigate('EnterAmount', {
  //       type:
  //         country == 1
  //           ? 'email'
  //           : country == 2
  //           ? 'wallet'
  //           : 'how did we get here?',
  //       address: text,
  //     })
  //   : ''

  const [country, setCountry] = useState('1');
  const [text, setText] = useState('');
  const handleSubmit = () => {
    if (country == 1) {
      // if(!country.includes('@')) return;
      fetch(`https://emailfind.api.xade.finance/polygon?email=${text}`, {
        method: 'GET',
      })
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            return response.text();
          } else return 0;
        })
        .then(data => {
          if (data != 0)
            navigation.navigate('EnterAmount', {
              type: 'email',
              walletAddress: data,
              emailAddress: text,
            });
        });
    } else if (country == 2) {
      navigation.navigate('EnterAmount', {
        type: 'wallet',
        walletAddress: data,
      });
    } else console.log('How did we get here?');
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
          width: '100%',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Icon
          name="arrow-left"
          style={{position: 'absolute', left: 0}}
          // size={30}
          color="white"
          type="feather"
          onPress={() => navigation.navigate('Payments')}
        />
        <Text
          style={{fontSize: 25, fontFamily: 'VelaSans-Bold', color: 'white'}}>
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
            <SelectCountry
              style={styles.dropdown}
              selectedTextStyle={{width: 10}}
              placeholderStyle={styles.placeholderStyle}
              containerStyle={{backgroundColor: 'black'}}
              imageStyle={styles.imageStyle}
              iconStyle={styles.iconStyle}
              maxHeight={200}
              value={country}
              data={local_data}
              valueField="value"
              // labelField="lable"
              imageField="image"
              placeholder=""
              search={false}
              searchPlaceholder="Search..."
              onChange={e => {
                setCountry(e.value);
              }}
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
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.navigate('EnterAmount')}>
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
    // margin: 16,
    height: 50,
    width: '10%',
    // backgroundColor: '#000',
    // borderRadius: 22,
    marginHorizontal: 15,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
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
