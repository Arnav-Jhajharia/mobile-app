import React, {useState} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
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
  StyleSheet
} from 'react-native';
// import {Icon} from 'react-native-elements';

// import Clipboard from '@react-native-clipboard/clipboard';

import {Text} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import styles from './settings-styles';
import {Icon} from 'react-native-elements';
import {useEffect} from 'react';
const { height, width } = Dimensions.get('window');

// import {EventsCarousel} from './eventsCarousel';
const HorizontalRule = () => {
    return <View style={ruleStyles.hr} />;
  };
  
  const ruleStyles = StyleSheet.create({
    hr: {
      borderBottomColor: 'rgba(125, 127, 124, 0.5)',
      borderBottomWidth: 1,
      marginVertical: 10,
      width: '100%'
    },
  });

// import {signAndSendTransactionConnect} from '../../particle-connect';
let address;
let info;
let imageUrl;
const Component = ({navigation}) => {
    
    if (global.withAuth) {
        address = global.loginAccount.publicAddress;
        info = global.loginAccount.phoneEmail;
        imageUrl  = `https://ui-avatars.com/api/?name=${info}&format=png&rounded=true`
      } else {
        address = global.connectAccount.publicAddress;
        info = global.connectAccount.phoneEmail;
        imageUrl  = `https://ui-avatars.com/api/?name=${info}&format=png&rounded=true`
      }
    const [amount, setAmount] = React.useState(0);
  return (
    <SafeAreaView style={{width: '100%', height: '100%', alignItems: 'center'}}>
        <ScrollView style = {{width: width}} contentContainerStyle = {{alignItems: 'center'}}>
         <View style={styles.topbar}>
          <Text style={styles.logo}>Settings</Text>
          
        </View>

        <View style = {styles.nameSettings}>
        <Image 
        
        style={{width: 40, height: 40}}
        source={{uri: imageUrl}} />
        <View style = {{width: '80%'}}>
            <Text style = {{color: 'white', fontSize: 20, fontFamily: 'VelaSans-Medium'}}>{info.slice(0, 20)}...</Text>
            <Text style = {{color: 'white', fontFamily: 'VelaSans-Medium'}}>{address.slice(0, 16)}...</Text>
        </View>
        </View>

        <View style = {[styles.otherSettings, {marginBottom: 10}]}>
        <TouchableOpacity style = {styles.innerSettings}>
        <Image 
        
        style={{width: 30, height: 30}}
        source={{uri: imageUrl}} />
        <View style = {styles.actualSetting}>
            {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'VelaSans-Medium'}}>{info.slice(0, 20)}...</Text> */}
            <Text style = {styles.settingsText}>FAQs</Text>
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
        <TouchableOpacity style = {styles.innerSettings}>
        <Image 
        
        style={{width: 30, height: 30}}
        source={{uri: imageUrl}} />
        <View style = {styles.actualSetting}>
            {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'VelaSans-Medium'}}>{info.slice(0, 20)}...</Text> */}
            <Text style = {styles.settingsText}>Help and Support</Text>
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
        <TouchableOpacity style = {styles.innerSettings}>
        <Image 
        
        style={{width: 30, height: 30}}
        source={{uri: imageUrl}} />
        <View style = {styles.actualSetting}>
            {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'VelaSans-Medium'}}>{info.slice(0, 20)}...</Text> */}
            <Text style = {styles.settingsText}>Contact us</Text>
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
        <View style = {[styles.otherSettings, {marginBottom: 200}]}>
        <TouchableOpacity style = {styles.innerSettings}>
        <Image 
        
        style={{width: 30, height: 30}}
        source={{uri: imageUrl}} />
        <View style = {styles.actualSetting}>
            {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'VelaSans-Medium'}}>{info.slice(0, 20)}...</Text> */}
            <Text style = {styles.settingsText}>Privacy Policy</Text>
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
        <TouchableOpacity style = {styles.innerSettings}>
        <Image 
        
        style={{width: 30, height: 30}}
        source={{uri: imageUrl}} />
        <View style = {styles.actualSetting}>
            {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'VelaSans-Medium'}}>{info.slice(0, 20)}...</Text> */}
            <Text style = {styles.settingsText}>Terms of Service</Text>
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

        <TouchableOpacity style = {styles.innerSettings}>
        <Image 
        
        style={{width: 30, height: 30}}
        source={{uri: imageUrl}} />
        <View style = {styles.actualSetting}>
            {/* <Text style = {{color: 'white', fontSize: 20, fontFamily: 'VelaSans-Medium'}}>{info.slice(0, 20)}...</Text> */}
            <Text style = {styles.settingsText}>Deposit / Withdraw</Text>
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
        </ScrollView>
    </SafeAreaView>
  );
};






export default Component;
