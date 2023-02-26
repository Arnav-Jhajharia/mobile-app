import React from 'react';
import {TouchableOpacity,Dimensions,TextInput, FlatList,TouchableHighlight,SafeAreaView, StyleSheet, View, Linking, ScrollView} from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import {Text} from '@rneui/themed';
import CountDown from 'react-native-countdown-component';
import LinearGradient from 'react-native-linear-gradient';
import { SelectCountry } from 'react-native-element-dropdown';
import { Dropdown } from 'react-native-element-dropdown';

import countries from '../countries'

const buttons = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫'],
];

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
    }
]
const SendMobile = ({navigation}) => {
  let [amount, setAmount] = React.useState('');

    function handleButtonPress(button) {

      if(button !== '' && button !== '⌫')
      {
        setAmount(amount + button);
      }
      else if(button === '⌫') setAmount(amount.slice(0,-1));
    }
    const [value, setValue] = useState('+1');
    const renderItem = (item) => {
        return (
          <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
          </View>
        );
      };
    const [country, setCountry] = useState('1');
    const [text, setText] = useState('');
  return (
    <SafeAreaView style = {{width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
       <View style = {{position: 'absolute', top: '5%'}}><Text style = {{fontSize: 25, fontFamily: 'urmom', 'color': 'white'}}>Enter mobile no.</Text></View>
        <View style = {styles.container}>
            <View style = {styles.enterAmount}>
            
                <View style = {{'width': '30%'}}>
                <Dropdown
        style={styles.dropdown}
        // selectedTextStyle={{'width': 0}}
        placeholderStyle={styles.placeholderStyle}
        containerStyle={{backgroundColor: 'black'}}
        imageStyle={styles.imageStyle}
        iconStyle={styles.iconStyle}
        selectedTextStyle = {styles.selectedTextStyle}
        maxHeight={200}
        data={countries}
        search
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderItem={renderItem}
      />
                </View>

                <View style = {styles.enter}>
                <View  style = {{width: '100%', height: '100%',marginLeft: 10, justifyContent: 'center'}}>
                  <Text style = {{color: 'white', fontFamily: 'urmom', letterSpacing: 4, fontSize: 20}}>{amount}</Text>
                </View>
                </View>
            </View>
            <TouchableOpacity 
                 onPress={() => navigation.navigate('SendEmail')}
            style = {styles.subText}><Text style = {{color: '#4F4CF6'}}>Send to email/wallet address instead</Text></TouchableOpacity>
        </View>
        {
        buttons.map((row, i) => {
        return (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((button) => {
              return (
                <TouchableOpacity onPress = {() => {handleButtonPress(button)}} key={`button-${button}`} style={styles.button}>
                  <Text style={styles.buttonText}>{button}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          
        );
      })}
        <TouchableOpacity onPress = {
          
          () => 
          
          navigation.navigate('EnterAmount', {
            type: 'mobile',
            countryCode: value,
            // number: ,
          })
        
        } style = {styles.confirmButton}>
            <Text style = {{color: 'white', fontFamily: 'VelaSans-Medium', fontSize: 18}}>Continue</Text>
        </TouchableOpacity>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    enterAmount: {
        flexDirection: 'row'
    }, 
    dropdown: {
        // margin: 16,
        height: 50,
        width:'100%',
        // backgroundColor: '#000',
        // borderRadius: 22,
        marginHorizontal: 15,
      },
    //   imageStyle: {
    //     width: 24,
    //     height: 24,
    //     borderRadius: 12,
    //   },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 14,
        // marginLeft: 8,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
    container:  {
        alignItems: 'center',
        width: '100%',
        marginTop: '60%',

    }, 

    enterAmount: {
        width: '80%',
        borderRadius: 40,
        height: 50,
        backgroundColor: '#232E34',
        flexDirection: 'row'
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
        width: '70%',
        marginLeft: 15,
    },

    subText: {
        marginTop: 15,
    },
    row: {
      flexDirection: 'row',
      // marginBottom: 10,
      // borderBottomWidth: 0.2,
      borderColor: 'grey',
    },
    button: {
      width: 90,
      height: 35,
      // backgroundColor: 'gray',
      borderRadius: 25,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 24,
    },
})

export default SendMobile;