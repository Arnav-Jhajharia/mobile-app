import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Buffer} from 'buffer';
global.Buffer = Buffer;
import '../global';
import {
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import BottomNavbar from './screens/navbar';
import StaticHomeScreen from './screens/loggingIn/home';
import Login from './screens/loggingIn/login';
import ChooseConnect from './screens/loggingIn/connect';
import Countdown from './screens/loggedIn/countdown/countdown';
import QRPage from './screens/loggedIn/qr/qr';
import Investments from './screens/loggedIn/investments/investments';
import SavingsComponent from './screens/loggedIn/savings/savings';
import PaymentsComponent from './screens/loggedIn/payments/payments';
import EnterAmountComponent from './screens/enterAmount';
import EnterSavingsAmountComponent from './screens/enterSavingsAmount';
import SendEmailComponent from './screens/loggedIn/send/sendEmail';
import SendMobileComponent from './screens/loggedIn/send/sendMobile';
import {Text} from 'react-native-elements';

import Pending from './screens/loggedIn/txStatus/pending';
import Successful from './screens/loggedIn/txStatus/successful';
import Unsuccessful from './screens/loggedIn/txStatus/unsuccessful';

const Stack = createNativeStackNavigator();
const bg = require('./../assets/bg.png');
const particle = require('../assets/particle.jpg');
const windowHeight = Dimensions.get('window').height;

function Particle({navigation}) {
  return (
    <View>
      <Login navigation={navigation} />
    </View>
  );
}

function ChooseWallet({navigation}) {
  return (
    <View>
      <ChooseConnect navigation={navigation} />
    </View>
  );
}

function LoggedIn({navigation}) {
  return (
    <ScrollView>
      <View style={styles.black}>
        <SafeAreaView>
          <View>
            <Countdown navigation={navigation} />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

function Connected({navigation}) {
  return (
    <ScrollView>
      <View style={styles.black}>
        <SafeAreaView>
          <View>
            <Countdown navigation={navigation} />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

function Error({navigation}) {
  return (
    <ImageBackground source={particle} style={styles.bg}>
      <SafeAreaView>
        <View>
          <Text style={styles.text}>Error...</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Particle')}
          />
          <Text style={styles.buttonText}>Try Again</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function Loading({navigation}) {
  return (
    <ImageBackground source={bg} style={styles.bg}>
      <SafeAreaView>
        <View>
          <ActivityIndicator
            style={styles.loader}
            color="#E8FF59"
            size="large"
          />
          <Text style={styles.text}>Loading...</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function ComingSoon({navigation}) {
  return (
    <ImageBackground source={particle} style={styles.bg}>
      <ScrollView>
        <SafeAreaView>
          <View>
            <Text style={styles.comingSoonText}>Coming Soon...</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
      <BottomNavbar navigation={navigation} />
    </ImageBackground>
  );
}

function Savings({navigation}) {
  return (
    <SafeAreaView style={styles.black}>
      <ScrollView style={{height: windowHeight * 0.8}}>
        <View>
          <SavingsComponent navigation={navigation} />
        </View>
      </ScrollView>
      <BottomNavbar navigation={navigation} />
    </SafeAreaView>
  );
}

function Investment({navigation}) {
  return (
    <View>
      <Investments navigation={navigation} />
    </View>
  );
}

function Payments({navigation}) {
  return (
    <SafeAreaView style={styles.black}>
      <ScrollView style={{height: windowHeight * 0.8}}>
        <View>
          <PaymentsComponent navigation={navigation} />
        </View>
      </ScrollView>
      <BottomNavbar navigation={navigation} />
    </SafeAreaView>
  );
}

function EnterAmount({navigation, route}) {
  return (
    // <ScrollView>
    <View style={styles.black}>
      {/* <SafeAreaView>   */}
      {/* <View> */}
      <EnterAmountComponent navigation={navigation} route={route} />
      {/* </View> */}
      {/* </SafeAreaView> */}
    </View>
  );
}

function EnterSavingsAmount({navigation, route}) {
  return (
    // <ScrollView>
    <View style={styles.black}>
      {/* <SafeAreaView>   */}
      {/* <View> */}
      <EnterSavingsAmountComponent navigation={navigation} route={route} />
      {/* </View> */}
      {/* </SafeAreaView> */}
    </View>
  );
}
function SendEmail({navigation}) {
  return (
    <ScrollView>
      <View style={styles.black}>
        <SafeAreaView>
          <View>
            <SendEmailComponent navigation={navigation} />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

function SendMobile({navigation}) {
  return (
    <ScrollView>
      <View style={styles.black}>
        <SafeAreaView>
          <View>
            <SendMobileComponent navigation={navigation} />
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

export default function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/*
        <Stack.Screen
          name="Home"
          component={StaticHomeScreen}
          options={{headerShown: false}}
        />
        */}
        <Stack.Screen
          name="Home"
          component={StaticHomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Particle"
          component={Particle}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChooseConnect"
          component={ChooseWallet}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoggedIn"
          component={LoggedIn}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Connected"
          component={Connected}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Error"
          component={Error}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Loading"
          component={Loading}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ComingSoon"
          component={ComingSoon}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRScreen"
          component={QRPage}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Investments"
          component={Investment}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Savings"
          component={Savings}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Payments"
          component={Payments}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterAmount"
          component={EnterAmount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterSavingsAmount"
          component={EnterSavingsAmount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SendEmail"
          component={SendEmail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SendMobile"
          component={SendMobile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pending"
          component={Pending}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Successful"
          component={Successful}
          navigation={navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Unsuccessful"
          component={Unsuccessful}
          navigation={navigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  loader: {
    marginTop: '80%',
  },

  text: {
    color: '#e8ff59',
    fontFamily: 'NeueMachina-UltraBold',
    fontSize: 25,
    marginTop: '5%',
    textAlign: 'center',
  },

  comingSoonText: {
    color: '#fff',
    fontFamily: 'Benzin-Medium',
    fontSize: 35,
    textAlign: 'center',
    marginTop: '60%',
  },

  button: {
    width: '50%',
    color: '#000',
    borderRadius: 10,
    marginLeft: '25%',
    marginTop: '20%',
    padding: '7%',
    backgroundColor: '#E8FF59',
    marginBottom: '5%',
  },

  buttonText: {
    color: '#000',
    fontFamily: 'VelaSans-Bold',
    fontSize: 20,
    marginTop: '-15.5%',
    marginLeft: '38%',
  },

  walletButton: {
    width: '50%',
    color: '#000',
    borderRadius: 10,
    marginLeft: '26%',
    marginTop: '90%',
    padding: '5%',
    backgroundColor: '#E8FF59',
    marginBottom: '5%',
  },

  walletButtonText: {
    color: '#000',
    fontFamily: 'VelaSans-Bold',
    fontSize: 17,
    marginTop: '-1%',
    marginLeft: '15%',
  },

  logoutext: {
    color: '#fff',
    fontFamily: 'VelaSans-Bold',
    fontSize: 20,
    textAlign: 'center',
  },

  logout: {
    width: '100%',
    color: '#fff',
    fontFamily: 'VelaSans-Bold',
    fontSize: 20,
    marginTop: '67%',
  },

  black: {
    height: windowHeight,
    backgroundColor: '#0C0C0C',
  },
});
