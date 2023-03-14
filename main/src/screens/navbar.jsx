import React from 'react';

import {View, StyleSheet,Dimensions} from 'react-native';

import {Text} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {color} from 'react-native-elements/dist/helpers';
const Web3 = require('web3');
import LinearGradient from 'react-native-linear-gradient';
const windowHeight = Dimensions.get('window').height;
const selectedIcon = '#fff';
const icon = '#9D9D9D';
const BottomNavbar = ({navigation, selected}) => {
  console.log(selected)
  return (
    // <View style = {{height: windowHeight * 0.3}}>
      <View  style={[styles.container, {paddingBottom: (selected != 'Investments')?25:0}]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#9D9D9D', '#9D9D9D', '#9D9D9D']}
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
              size={26}
              // style={selected == 'Payments'?selectedIcon:icon}
              onPress={() => navigation.navigate('Payments')}
              color={selected == 'Payments'?selectedIcon:icon}
            />
          </View>

          <View style={styles.navItem}>
            <Icon
              name="piggy-bank-outline"
              type="material-community"
              // style={selected == 'Savings'?styles.selectedIcon:styles.icon}
              size={30}
              onPress={() => navigation.navigate('Savings')}
              color={selected == 'Savings'?selectedIcon:icon}
            />
          </View>
          <View style={styles.navItem}>
            <Icon
              name="stats-chart"
              type="ionicon"
              size={25}
              // style={selected == 'Investments'?styles.selectedIcon:styles.icon}
              onPress={() => navigation.navigate('Investments')}
              color={selected == 'Investments'?selectedIcon:icon}
            />
          </View>
          <View style={styles.navItem}>
            <Icon
              name="shopping-bag"
              type="feather"
              // style={selected == 'ComingSoon'?styles.selectedIcon:styles.icon}
              size={25}
              onPress={() => navigation.navigate('ComingSoon')}
              color={selected == 'ComingSoon'?selectedIcon:icon}
            />
          </View>
        </View>
      </View>
    // </View>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
    color: '#9D9D9D',
    marginTop: 4,
  },
  icon: {
    color: '#9D9D9D',
  },
  iconSelected: {
    color: '#fff'
  }
});

export default BottomNavbar;
