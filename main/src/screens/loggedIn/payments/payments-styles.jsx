import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    borderWidth: 1,
    // borderColor: 'rgba(128,128,128, 0.5)',
    // borderRadius: 50,
    // borderTopRightRadius: 0,
    // borderTopLeftRadius: 0,
    // // borderBottomWidth: 0,
    // borderRightWidth: 0,
    // borderLeftWidth: 0,
    // borderTopWidth: 0,
    // flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  topbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#0C0C0C',
  },

  logo: {
    fontFamily: 'VelaSans-ExtraBold',
    color: '#fff',
    fontSize: 25,
    marginLeft: '8%',
    marginTop: '2%',
    marginBottom: '2%',
  },

  mainContent: {
    marginTop: '20%',
    width: '100%',
    backgroundColor: 'transparent',
  },

  topContent: {
    width: '100%',
    backgroundColor: 'transparent',
  },

  launch: {
    color: '#fff',
    fontFamily: 'NeueMontreal-Bold',
    textAlign: 'center',
    fontSize: 25,
  },

  countdown: {
    marginTop: '25%',
    width: '100%',
  },

  digits: {
    fontFamily: 'NeueMachina-UltraBold',
    color: '#E8FF59',
  },

  timeLabels: {
    color: '#fff',
    fontFamily: 'NeueMachina-UltraBold',
  },

  subText: {
    color: '#999',
    fontFamily: 'VelaSans-Bold',
    textAlign: 'center',
    fontSize: 17,
    marginTop: '30%',
  },

  button: {
    height: '30%',
    width: '70%',
    borderRadius: 50,
    marginLeft: '15%',
    marginTop: '20%',
    paddingVertical: '5%',
    backgroundColor: '#0C0C0C',
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'VelaSans-Medium',
    fontSize: 15,
    textAlign: 'center',
  },

  fontContainer: {
    alignItems: 'center',
    marginTop: '15%',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 10,
    width: '100%',
    height: 60,
    // backgroundColor: 'white',
  },

  qrButton: {
    width: '15%',
    color: '#0C0C0C',
    borderRadius: 15,
    marginLeft: '1%',
    padding: '5%',
    backgroundColor: '#E8FF59',
    marginBottom: '5%',
    height: '100%',
  },

  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '37%',
    color: '#0C0C0C',
    borderRadius: 15,
    marginRight: '4%',
    padding: '0%',
    backgroundColor: '#E8FF59',
    marginBottom: '5%',
    height: '100%',
    backgroundColor: '#d9d9d9',
    shadowColor: '#0C0C0C000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },

  buttonIcon: {
    borderRadius: 15,
    //   backgroundColor: 'blue',
    height: '100%',
    width: '40%',
  },

  buttonText: {
    marginRight: '20%',
  },

  transactionContainer: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'column',
  },

  heading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

  transactions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  transactionLeft: {
    flexDirection: 'row',
  },

  tup: {
    backgroundColor: 'rgba(49,59,62, 0.4)',
    borderRadius: 10,
    padding: 4,
  },

  ttext: {
    marginLeft: 10,
  },

  depWith: {
    flexDirection: 'row',
    height: '100%',
    width: '30%',
    borderRadius: 20,
  },

  innerDep: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: '1%',
    paddingRight: '1%',
  },

  noTransaction: {
    color: '#d9d9d9',
    marginTop: '20%',
    textAlign: 'center',
    fontFamily: 'EuclidCircularA-Regular',
    fontSize: 15,
  },
});

export default styles;
