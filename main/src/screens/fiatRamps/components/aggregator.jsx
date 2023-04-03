import React, {useState} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  Clipboard,
  Dimensions,
  Alert,
} from 'react-native';
import {Text} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import styles from './../styles/aggregator';
import {Icon} from 'react-native-elements';
import {useEffect} from 'react';
const { height } = Dimensions.get('window');

// import {EventsCarousel} from './eventsCarousel';


// import {signAndSendTransactionConnect} from '../../particle-connect';



const Component = ({navigation}) => {
  
  return (
    <SafeAreaView style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <View>
            <Text>Choose your country</Text>
            
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Component;
