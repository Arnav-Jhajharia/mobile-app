import React from 'react';

import {View, StyleSheet} from 'react-native';

import {Text} from 'react-native-elements';
import {Icon} from 'react-native-elements';
const Web3 = require('web3');
import LinearGradient from 'react-native-linear-gradient';

const BottomNavbar = ({navigation}) => {
  return (
    <View>
      <View style={styles.container}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#0C0C0C', 'grey', '#0C0C0C']}
          style={styles.top}></LinearGradient>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={styles.navItem}>
            <Icon
              name="home"
              type="octicon"
              style={styles.icon}
              onPress={() => navigation.navigate('Payments')}
              color={'grey'}
            />
            <Text style={styles.navItemText}>Home</Text>
          </View>

          <View style={styles.navItem}>
            <Icon
              name="piggy-bank-outline"
              type="material-community"
              style={styles.icon}
              onPress={() => navigation.navigate('Savings')}
              color={'grey'}
            />
            <Text style={styles.navItemText}>Savings</Text>
          </View>
          <View style={styles.navItem}>
            <Icon
              name="stats-chart"
              type="ionicon"
              style={styles.icon}
              onPress={() => navigation.navigate('Investments')}
              color={'grey'}
            />
            <Text style={styles.navItemText}>Investments</Text>
          </View>
          <View style={styles.navItem}>
            <Icon
              name="shopping-bag"
              type="feather"
              style={styles.icon}
              onPress={() => navigation.navigate('ComingSoon')}
              color={'grey'}
            />
            <Text style={styles.navItemText}>Shop</Text>
          </View>
          <View style={styles.navItem}>
            <Icon
              name="creditcard"
              type="antdesign"
              style={styles.icon}
              size={22}
              onPress={() => navigation.navigate('ComingSoon')}
              color={'grey'}
            />
            <Text style={styles.navItemText}>Card</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    height: 1,
    width: '100%',
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#0C0C0C',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItemText: {
    fontFamily: 'VelaSans-Light',
    fontSize: 10,
    color: 'grey',  
    marginTop: 4,
  },
  icon: {
    color: '#fff',
  },
});

export default BottomNavbar;
