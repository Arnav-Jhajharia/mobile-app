import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const points = 12040;
const starIcon = require('./coins.png');

const addPoints = async (userId, transactionAmount) => {
    try {
      const response = await fetch('https://refer.xade.finance/points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId:userId.toLowerCase(), transactionAmount: 0 })
      });
  
      const data = await response.json();
      console.log(data)
      if(data.points > 0)
      return data.points.toFixed(2);
      else 
      return 0;
    } catch (err) {
      console.error(err);
    }
  };

function TopBar({navigation, headers}) {
    const [infoVisible, setInfoVisible] = useState(false);
    const [points, setPoints] = useState(0);
    useEffect(() => {
        async function logic()
        {   
            const address = await AsyncStorage.getItem('address')
            const _points = await addPoints(address.toLowerCase(), 0)
            setPoints(_points);
        }
        logic()
    })
  return (
    <View style={styles.container}>
         <Text style={styles.logo}>{headers}</Text>
         <View style = {{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => setInfoVisible(!infoVisible)}
        activeOpacity={0.8}
        style = {{marginRight: 15}}
      >
        <View style={styles.pointsContainer}>
        <Image source={starIcon} style={styles.pointsIcon} />
          <Text style={styles.pointsText}>{points}</Text>
        </View>
        
      </TouchableOpacity>
      <Icon
              onPress={() => navigation.navigate('Settings')}
              // style={styles.tup}
              name={'settings'}
              size={24}
              color={'#fff'}
              type="material"
              // style = {{marginRight: '1%'}}
            />
      </View>
      
      {infoVisible && (
        <View style={styles.infoContainer}>
          <View style={styles.arrowContainer}>
            <View style={styles.arrowUp} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoText}>
              Earn Xade points by completing transactions or quests in Xade which can be redeemed for the Xade token later
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    pointsIcon: {
        width: 36,
        height: 36,
        marginLeft: 4,
      },
  container: {
    backgroundColor: '#0c0c0c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pointsContainer: {
    // backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: 'VelaSans-Bold'
  },
  pointsText: {
    // backgroundColor: 'rgba(90, 90, 90, 0.3)',
    borderBottomRightRadius:10,
    borderTopRightRadius: 10,
    color: 'white',
    fontFamily: 'VelaSans-ExtraBold',
    fontSize: 16,
    // fontWeight: 'bold', 
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 7,
    paddingLeft: 5,
    // padding
    // marginLeft: 8,
  },
  infoContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    width: '60%',
    // zIndex: -1
  },
  arrowContainer: {
    zIndex: 999,
    position: 'absolute',
    top: -10,
    left: 20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '180deg' }],
  },
  arrowUp: {
    zIndex: 999,
    width: 20,
    height: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  infoContent: {
    zIndex: 999,
    padding: 8,
  },
  infoText: {
    zIndex: 999,
    fontSize: 14,
    color: 'black'
  },
  logo: {
    fontFamily: 'VelaSans-ExtraBold',
    color: '#fff',
    fontSize: 23,
    // marginLeft: '5%',
    marginBottom: '2%',
  }
});

export default TopBar;
