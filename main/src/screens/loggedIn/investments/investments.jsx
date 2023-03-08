import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Text, Icon} from '@rneui/themed';
import {Slider} from 'react-native-elements';
import styles from './investment-styles';
import BottomNavbar from '../../navbar';

red = true;
class Investments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 'N/A',
      buyPrice: '',
      btnSelected: 'long',
      nBtc: '',
      status: true,
      leverageValue: 1,
      latestBlock: {},
    };
    this.updatePrice = this.updatePrice.bind(this);
  }

  updatePrice() {
    let bitcoinPriceUrl =
      'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
    let newPrice = 'Unavailable.';

    fetch(bitcoinPriceUrl)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          price: responseJson.bpi.USD.rate,
          buyPrice: responseJson.bpi.USD.rate,
          nBtc: 1.0,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  btcFirst = () => {
    if (this.state.status == true) {
      this.setState({status: false});
    } else {
      this.setState({status: true});
    }
  };

  componentDidMount() {
    this.updatePrice();
  }

  render(navigation) {
    return (
      <View style={styles.black}>
        <ScrollView>
          <SafeAreaView>
            <View style={styles.investmentsNav}>
              <Text style={styles.logo}>Investments</Text>
              <View
                style={{
                  justifyContent: 'space-evenly',
                  flexDirection: 'row',
                  marginTop: '5%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      btnSelected: 'chart',
                    });
                  }}
                  style={
                    this.state.btnSelected == 'chart'
                      ? styles.navSelected
                      : styles.navComponents
                  }>
                  <Text
                    style={
                      this.state.btnSelected == 'chart'
                        ? styles.navSelectedText
                        : styles.navText
                    }>
                    Overview
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      btnSelected: 'long',
                    });
                  }}
                  style={
                    this.state.btnSelected == 'long'
                      ? styles.greenSelected
                      : styles.navComponents
                  }>
                  <Text
                    style={
                      this.state.btnSelected == 'long'
                        ? styles.navSelectedText
                        : styles.navText
                    }>
                    Long
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      btnSelected: 'short',
                    });
                  }}
                  style={
                    this.state.btnSelected == 'short'
                      ? styles.redSelected
                      : styles.navComponents
                  }>
                  <Text
                    style={
                      this.state.btnSelected == 'short'
                        ? styles.navSelectedText
                        : styles.navText
                    }>
                    Short
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={
                  this.state.btnSelected == 'long' ||
                  this.state.btnSelected == 'short'
                    ? {display: 'none'}
                    : styles.longshortContainer
                }>
                <View style={styles.marketTrades}>
                  <View style={styles.subContents}>
                    <Text style={styles.marketText}>
                      Market Trades Appear Here
                    </Text>
                  </View>
                </View>
                <View style={styles.marketTrades}>
                  <View style={styles.subContents}>
                    <Text style={styles.marketText}>Portfolio</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={
                this.state.btnSelected == 'long' ||
                this.state.btnSelected == 'short'
                  ? styles.longshortContainer
                  : {display: 'none'}
              }>
              <View style={styles.priceSlippage}>
                <View style={styles.price}>
                  <View style={styles.subContents}>
                    <Text style={styles.subText}>Price</Text>
                    <TextInput
                      //    onPress={this.updatePrice()}
                      style={styles.subPrice}
                      placeholderTextColor={'#C4C4C4'}
                      value={this.state.price}
                      onChangeText={newText => this.setState({price: newText})}
                    />
                  </View>
                </View>
                <View style={styles.slippage}>
                  <View style={styles.subContents}>
                    <Text style={styles.subText}>Slippage</Text>
                    <TextInput
                      style={styles.subPrice}
                      placeholder="0%"
                      placeholderTextColor={'#C4C4C4'}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.btcUsd}>
                <View style={styles.btc}>
                  <View style={styles.subContents}>
                    <Text style={styles.subText}>You Sell</Text>
                    {this.state.status ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextInput
                          //    onPress={this.updatePrice()}
                          style={styles.subPrice}
                          placeholderTextColor={'#C4C4C4'}
                          value={this.state.buyPrice}
                          onChangeText={newText =>
                            this.setState({buyPrice: newText})
                          }
                        />
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 20,
                            fontFamily: 'EuclidCircularA-Regular',
                          }}>
                          USD
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <TextInput
                            //    onPress={this.updatePrice()}
                            style={styles.subPrice}
                            placeholderTextColor={'#C4C4C4'}
                            value={this.state.nBtc.toString()}
                            onChangeText={newText =>
                              this.setState({
                                nBtc: newText,
                              })
                            }
                          />
                          <Text style={{color: '#ffd700', fontSize: 20}}>
                            BTC
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.btcFirst()}
                  style={{
                    transform: [{rotate: '90deg'}],
                    flex: 10,
                    position: 'absolute',
                    marginTop: '10%',
                  }}>
                  <Icon
                    reverse
                    name="swap"
                    type="antdesign"
                    color="#161616"
                    size={25}
                  />
                </TouchableOpacity>
                <View style={styles.usd}>
                  <View style={styles.subContents}>
                    <Text style={styles.subText}>You Receive</Text>
                    {this.state.status ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={styles.subPrice}>
                          {(
                            Number(this.state.buyPrice.replaceAll(',', '')) /
                            Number(this.state.price.replaceAll(',', ''))
                          ).toFixed(3)}
                        </Text>
                        <Text
                          style={{
                            color: '#ffd700',
                            fontSize: 20,
                            fontFamily: 'EuclidCircularA-Regular',
                          }}>
                          BTC
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.subPrice}>
                            {(
                              Number(this.state.nBtc) *
                              Number(this.state.price.replaceAll(',', ''))
                            ).toFixed(3)}
                          </Text>
                          <Text style={{color: 'white', fontSize: 20}}>
                            USD
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.leverage}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.leverageText}>Leverage</Text>
                  <Text style={styles.leverageIndicator}>
                    {this.state.leverageValue}x
                  </Text>
                </View>
                <Slider
                  thumbStyle={{
                    height: 20,
                    width: 20,
                    backgroundColor: '#232323',
                  }}
                  trackStyle={{height: 5}}
                  style={{marginTop: 10}}
                  value={this.state.leverageValue}
                  onValueChange={value => this.setState({leverageValue: value})}
                  step={1}
                  minimumValue={1}
                  maximumValue={10}
                />
              </View>
              <View>
                <Text style={styles.orderSummary}>
                  Scroll To See Order Summary
                </Text>
              </View>
              <View style={styles.summary}>
                <Text style={styles.summaryHeader}>Order Summary</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}>
                  <Text style={styles.orderDescription}>Entry Price</Text>
                  <Text style={styles.orderAmount}>${this.state.price}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}>
                  <Text style={styles.orderDescription}>Index Price</Text>
                  <Text style={styles.orderAmount}>${this.state.buyPrice}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}>
                  <Text style={styles.orderDescription}>Funding Rate</Text>
                  <Text style={styles.orderAmount}>0%</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}>
                  <Text style={styles.orderDescription}>Trading Fees</Text>
                  <Text style={styles.orderAmount}>$0</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}>
                  <Text style={styles.orderDescription}>Position Size</Text>
                  <Text style={styles.orderAmount}>$0</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
        <View style={styles.confirmButton}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ComingSoon')}
            style={
              this.state.btnSelected == 'long' ||
              this.state.btnSelected == 'short'
                ? this.state.btnSelected == 'short'
                  ? styles.shortButton
                  : styles.longButton
                : {display: 'none'}
            }>
            {this.state.btnSelected == 'short' ? (
              <Text style={styles.confirmText}>Coming Soon!</Text>
            ) : (
              <Text style={styles.confirmText}>Coming Soon!</Text>
            )}
          </TouchableOpacity>
          <BottomNavbar navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

export default Investments;
