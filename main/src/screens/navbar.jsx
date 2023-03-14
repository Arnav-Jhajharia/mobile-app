import React from 'react';

import {View, StyleSheet} from 'react-native';

import {Text} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {color} from 'react-native-elements/dist/helpers';
import LinearGradient from 'react-native-linear-gradient';

const BottomNavbar = ({navigation}) => {
  return (
    <View>
      <View style={styles.container}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#0C0C0C', '#9D9D9D', '#0C0C0C']}
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
              style={styles.icon}
              onPress={() => navigation.navigate('Payments')}
              color={'#9D9D9D'}
            />
          </View>

          <View style={styles.navItem}>
            <Icon
              name="piggy-bank-outline"
              type="material-community"
              style={styles.icon}
              size={30}
              onPress={() => navigation.navigate('Savings')}
              color={'#9D9D9D'}
            />
          </View>
          <View style={styles.navItem}>
            <Icon
              name="stats-chart"
              type="ionicon"
              size={25}
              style={styles.icon}
              onPress={() => navigation.navigate('Investments')}
              color={'#9D9D9D'}
            />
          </View>
          <View style={styles.navItem}>
            <Icon
              name="shopping-bag"
              type="feather"
              style={styles.icon}
              size={25}
              onPress={() => navigation.navigate('ComingSoon')}
              color={'#9D9D9D'}
            />
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
    justifyContent: 'space-evenly',
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
    color: '#9D9D9D',
    marginTop: 4,
  },
  icon: {
    color: '#9D9D9D',
  },
});

export default BottomNavbar;
