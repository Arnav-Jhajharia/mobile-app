import {Dimensions, StyleSheet} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  black: {
    backgroundColor: '#0C0C0C',
    width: '100%',
    height: '100%',
  },

  investmentsNav: {},

  logo: {
    fontFamily: 'VelaSans-ExtraBold',
    color: '#fff',
    fontSize: 25,
    marginLeft: '8%',
    marginTop: '2%',
    marginBottom: '2%',
  },

  navComponents: {
    borderWidth: 1,
    borderColor: '#747474',
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 7,
  },

  navText: {
    color: '#747474',
    fontFamily: 'VelaSans-ExtraBold',
  },

  navSelected: {
    borderWidth: 1,
    borderColor: '#1E1E1E',
    backgroundColor: '#1E1E1E',
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 7,
  },

  redSelected: {
    borderWidth: 1,
    borderColor: '#E14C4C',
    backgroundColor: '#E14C4C',
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 7,
  },

  greenSelected: {
    borderWidth: 1,
    borderColor: '#2FBE6A',
    backgroundColor: '#2FBE6A',
    borderRadius: 50,
    paddingHorizontal: 25,
    paddingVertical: 7,
  },

  navText: {
    color: '#747474',
    fontFamily: 'VelaSans-ExtraBold',
  },

  navSelectedText: {
    color: '#fff',
    fontFamily: 'VelaSans-ExtraBold',
  },

  marketTrades: {
    width: '80%',
    marginLeft: '10%',
    backgroundColor: '#1E1E1E',
    borderRadius: 7,
    marginTop: '20%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  marketText: {
    color: 'grey',
    fontFamily: 'VelaSans-Bold',
    textAlign: 'center',
    fontSize: 15,
  },

  priceSlippage: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: '20%',
    width: '90%',
    marginLeft: '5%',
  },

  price: {
    width: '70%',
    backgroundColor: '#1E1E1E',
    borderRadius: 7,
    marginTop: '-7%',
  },

  slippage: {
    marginLeft: '3%',
    width: '25%',
    backgroundColor: '#1E1E1E',
    borderRadius: 7,
    marginTop: '-7%',
  },

  subContents: {
    width: '80%',
    marginLeft: 15,
    marginTop: 15,
  },

  subText: {
    color: '#868686',
    fontFamily: 'EuclidCircularA-Regular',
    textAlign: 'left',
    fontSize: 15,
  },

  subPrice: {
    fontFamily: 'EuclidCircularA-Regular',
    textAlign: 'left',
    marginTop: 4,
    fontSize: 26,
    color: '#C4C4C4',
    marginBottom: 15,
  },

  btcUsd: {
    width: '90%',
    marginLeft: '5%',
    alignItems: 'center',
    marginTop: '5%',
  },

  btc: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 7,
    flex: 1,
  },

  usd: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 7,
    marginTop: '3%',
  },

  leverage: {
    width: '85%',
    marginLeft: '7.5%',
    marginTop: '10%',
  },

  leverageText: {
    color: '#FFF',
    fontFamily: 'VelaSans-Bold',
    fontSize: 23,
  },

  leverageIndicator: {
    marginTop: 7,
    color: '#787777',
    fontSize: 20,
    fontFamily: 'EuclidCircularA-Regular',
  },

  orderSummary: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'VelaSans-ExtraBold',
    marginTop: '7%',
    fontSize: 15,
  },

  longButton: {
    marginBottom: 80,
    backgroundColor: '#2FBE6A',
    paddingVertical: 12,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 10,
  },

  shortButton: {
    marginBottom: 80,
    backgroundColor: '#E14C4C',
    paddingVertical: 12,
    width: '80%',
    marginLeft: '10%',
    borderRadius: 10,
  },

  confirmButton: {
    marginTop: 15,
    marginBottom: 25,
  },

  confirmText: {
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'VelaSans-ExtraBold',
    fontSize: 20,
  },

  summary: {
    marginTop: '15%',
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#1E1E1E',
    borderRadius: 7,
    paddingBottom: '10%',
  },

  summaryHeader: {
    marginTop: '10%',
    marginLeft: '5%',
    color: '#FFF',
    fontFamily: 'VelaSans-ExtraBold',
    fontSize: 20,
    marginBottom: '10%',
  },

  orderDescription: {
    color: '#FFF',
    fontFamily: 'EuclidCircularA-Regular',
    paddingLeft: '5%',
  },

  orderAmount: {
    color: '#787777',
    fontFamily: 'EuclidCircularA-Regular',
    paddingRight: '5%',
  },
});

export default styles;
