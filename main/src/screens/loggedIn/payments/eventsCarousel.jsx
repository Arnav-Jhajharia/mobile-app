import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const DEVICE_WIDTH = Dimensions.get('window').width;
import Clipboard from '@react-native-clipboard/clipboard';
class EventsCarousel extends React.Component {
  scrollRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState(
        prev => ({
          selectedIndex:
            prev.selectedIndex === this.props.images.length - 1
              ? 0
              : prev.selectedIndex + 1,
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            x: (DEVICE_WIDTH / 1.6) * this.state.selectedIndex,
            y: 0,
          });
        },
      );
    }, 3000);
  };

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({selectedIndex});
  };

  render(navigation) {
    const {images} = this.props;
    const {selectedIndex} = this.state;
    return (
      <View
        style={{
          height: '100%',
          flexDirection: 'row',
          width: '95%',
          height: 300,
          justifyContent: 'space-around',
          flexDirection: 'row',
          marginLeft: 15,
        }}>
        <ScrollView
          horizontal
          pagingEnabled
          //onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}>
          {images.map(image => (
            // <View>
            // <Image
            //   style={styles.backgroundImage}
            //   source={require(`./img/${'derivex'}.png`)}
            // //   key={image}
            // />
            // <Text style = {{color: 'white'}}>{image.name}</Text>
            // </View
            <TouchableOpacity
              style={styles.depWith}
              onPress={() => {
                image.name == 'Referrals'
                  ?  
              Clipboard.setString(
                `
                Join the Xade revolution with the DeFi powered non custodial decentralised bank and help us both win Xade points by joining the link

                Download App: https://notifs.api.xade.finance/refer/${this.props.address} 
                `
              )
                : ""
              }}>
              <LinearGradient
                colors={['#1D2426', '#272727', '#383838']}
                useAngle
                angle={45}
                angleCenter={{x: 0.5, y: 0.5}}
                style={
                  [styles.remmitex]
                }>
                <Image
                  source={{
                    uri: image.image,
                  }}
                  style={{
                    marginTop: '5%',
                    width: 130,
                    height: 130,
                  }}
                />

                <Text style={styles.amountText}>{image.name}</Text>
                <Text style={styles.amountText3}>{image.details}</Text>
                {/* <Text style={styles.amountText2}>Try now</Text> */}
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* <View style={styles.circleDiv}>
          {images.map((image, i) => (
            <View
              style={[
                styles.whiteCircle,
                { opacity: i === selectedIndex ? 0.5 : 1 }
              ]}
              key={image}
              active={i === selectedIndex}
            />
          ))}
        </View> */}
      </View>
    );
  }
}




const styles = StyleSheet.create({
  backgroundImage: {
    // height: "100%",
    // width: Dimensions.get("window").width
  },
  circleDiv: {
    position: 'absolute',
    bottom: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 10,
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: '#fff',
  },

  depWith: {
    flexDirection: 'row', 
    width: DEVICE_WIDTH / 1.6,
    // borderRadius: 20,
    marginRight: 30,
  },

  derivex: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    borderWidth: 2,
    borderColor: '#C7FFD6',
  },

  sabex: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    borderWidth: 2,
    borderColor: '#87C4FF',
  },

  remmitex: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    borderWidth: 2,
    borderColor: '#CBCBCB',
  },

  amountText: {
    fontFamily: 'VelaSans-Bold',
    marginLeft: 20,
    marginTop: 20,
    fontSize: 18,
    alignSelf: 'flex-start',
    color: '#FFFFFF',
  },
  amountText3: {
    fontFamily: 'VelaSans-Bold',
    marginLeft: 20,
    // marginTop: 20,
    fontSize: 17,
    marginRight: 10,
    alignSelf: 'flex-start',
    color: 'grey',
  },

  amountText2: {
    fontFamily: 'VelaSans-Bold',
    marginTop: 15,
    marginLeft: 20,
    fontSize: 13,
    alignSelf: 'flex-start',
    color: '#FFFFFF',
  },
});

export {EventsCarousel};
