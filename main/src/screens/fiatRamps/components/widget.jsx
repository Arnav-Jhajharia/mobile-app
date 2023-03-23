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
import styles from './../styles/amount';
import {Icon} from 'react-native-elements';
import {useEffect} from 'react';

// import {EventsCarousel} from './eventsCarousel';


// import {signAndSendTransactionConnect} from '../../particle-connect';



const Component = ({navigation}) => {
  
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <View colors={['#222222', '#000']} style={styles.container}>
        
      </View>
    </SafeAreaView>
  );
};

export default Component;
