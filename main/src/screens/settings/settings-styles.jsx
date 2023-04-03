import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    
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

  nameSettings: {
    width: '90%',
    marginTop: width * 0.2,
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    padding: 15,
    justifyContent: 'space-between',
    borderRadius: 20,
    alignItems: 'center'
  },

  otherSettings: {
    width: '90%',
    marginTop: width * 0.1,
    flexDirection: 'column',
    backgroundColor: '#1C1C1E',
    paddingTop: 10,
    paddingBottom: 10,
    // justifyContent: 'space-between',
    borderRadius: 20,
    alignItems: 'center'
  },

  innerSettings: {
    paddingLeft: 10, 
    paddingRight: 20    ,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',

  },
  actualSetting: {

    width: '85%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'
  },
  settingsText: {fontSize: 18,color: 'white', fontFamily: 'VelaSans-Medium'}
})

export default styles;