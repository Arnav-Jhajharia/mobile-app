import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
  StyleSheet,
  View,
  Linking,
  ScrollView,
  Alert,
} from 'react-native';
import {Text} from '@rneui/themed';
import Video from 'react-native-video';
const successVideo = require('./success.mov');

export default function Component({navigation, route}) {
  if(route.params.type == 'v2') {
  fetch(
    `https://amtowe.api.xade.finance?from=${route.params.walletAddress}&to=${route.params.emailAddress}&amt=${route.params.amount}`)
                .then((res) => res.text())
                .then((json) => {

  })
}
  
  const hash = route.params;
  console.log(route.params)
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: '#0C0C0C'}}>
      <Text
        style={{
          color: '#fff',
          fontSize: 30,
          marginTop: '20%',
          textAlign: 'center',
          fontFamily: 'NeueMachina-UltraBold',
        }}>
        Transaction Success!
      </Text>
      <View style={{width: '80%', marginTop: '25%', marginLeft: '11%'}}>
        <Video
          source={successVideo}
          style={{width: 300, height: 300}}
          controls={false}
          repeat={true}
          ref={ref => {
            this.player = ref;
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`https://mumbai.polygonscan.com/tx/${hash['status']}`)
        }
        style={{marginTop: '20%'}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
            fontFamily: 'VelaSans-ExtraBold',
          }}>
          View Transaction On BlockExplorer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Payments');
          // Alert.alert('Success');
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            marginTop: '30%',
            textAlign: 'center',
            fontFamily: 'VelaSans-Bold',
          }}>
          Return Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
