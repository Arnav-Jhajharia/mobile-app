import {StyleSheet, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: windowHeight,
    flexDirection: 'column',
  },

  container: {
    width: '100%',
  },

  topbar: {
    width: '100%',
    height: windowHeight / 5,
    alignContent: 'flex-start',
  },

  buttonIcon: {
    color: '#fff',
    float: 'left',
    marginRight: '80%',
  },

  nav: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '50%',
    marginLeft: '25%',
  },

  navLeft: {
    justifyContent: 'flex-start',
    paddingVertical: '10%',
    paddingHorizontal: '15%',
    borderWidth: 2,
    borderColor: '#fff',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
  },

  leftText: {
    fontFamily: 'NeueMontreal-Bold',
    color: '#fff',
    fontSize: 15,
  },

  navRight: {
    justifyContent: 'flex-end',
    paddingVertical: '10%',
    paddingHorizontal: '15%',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },

  rightText: {
    fontFamily: 'NeueMontreal-Bold',
    color: '#000',
    fontSize: 15,
  },

  mainContent: {
    width: '100%',
    height: windowHeight - windowHeight / 5,
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  header: {
    textAlign: 'center',
    fontFamily: 'NeueMachina-UltraBold',
    fontSize: 30,
    color: '#fff',
    marginTop: '-5%',
  },

  qr: {
    backgroundColor: 'transparent',
    alignContent: 'center',
    padding: '2%',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 215,
  },

  logout: {
    textAlign: 'center',
    fontFamily: 'NeueMachina-UltraBold',
    fontSize: 30,
    color: '#fff',
    marginBottom: '15%',
    marginTop: '20%',
  },

  userInfo: {
    marginTop: '10%',
  },

  name: {
    textAlign: 'center',
    color: 'white',
    fontSize: 23,
    fontFamily: 'VelaSans-ExtraBold',
  },

  address: {
    color: 'white',
    marginTop: '5%',
    fontFamily: 'VelaSans-Bold',
    textAlign: 'center',
    fontSize: 14,
  },

  QRcontainer: {
    marginTop: '25%',
    alignItems: 'center',
  },

  bottomButton: {
    color: 'white',
    backgroundColor: 'transparent',
  },

  bottomText: {
    fontSize: 15,
    color: '#409eff',
    textAlign: 'center',
    fontFamily: 'VelaSans-ExtraBold',
    marginTop: windowHeight - windowHeight / 1.2,
  },

  scannedStyle: {
    color: 'white',
  },
});

export default styles;
