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

import getSpotPrice from './backend/viewFunctions';
import transactions from './backend/txFunctions';

import BTC from './data';

const screenWidth = Dimensions.get('window').width;

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

// const points = monotoneCubicInterpolation({data, range: 40});

function toDateTime(secs) {
  var t = new Date(secs); // Epoch
  console.log(t.toLocaleDateString('en-US'));
  return t;
}

red = true;
class Investments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 'Updating',
      buyPrice: '',
      btnSelected: 'overview',
      nBtc: '',
      status: true,
      leverageValue: 1,
      latestBlock: {},
      data: BTC.prices,
    };
    this.updatePrice = this.updatePrice.bind(this);
  }

  // test() {
  //   let web3;
  //   if (global.withAuth) {
  //     user = global.loginAccount.publicAddress;
  //     console.log('Global Account:', authAddress);
  //     web3 = this.createProvider();
  //     console.log(web3);
  //   } else {
  //     authAddress = global.connectAccount.publicAddress;
  //     console.log('Global Account:', global.connectAccount);
  //     console.log('Global Wallet Type:', global.walletType);
  //   }
  // }

  async updatePrice() {
    let bitcoinPriceUrl =
      'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
    let newPrice = 'Unavailable.';

    let btcUrl =
      'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365 &interval=daily';

    await fetch(bitcoinPriceUrl)
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

    await fetch(btcUrl)
      .then(response => response.json())
      .then(prices => {
        // console.log(prices.market_caps[0]);
        this.setState({
          data: prices.market_caps,
        });
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
    // console.log(BTC.image.large);
    // console.log(getSpotPrice('BTC'));
    // console.log(BTC.prices.map(price => toDateTime(Number(price[0]))));
  }

  render(navigation) {
    // events.test();
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
                <View style={styles.coinChart}>
                  <View style={styles.marketInfo}>
                    <View style={styles.stockName}>
                      <View style={{flexDirection: 'row', marginLeft: '5%'}}>
                        <Text style={styles.stockHead}>Bitcoin</Text>
                      </View>
                    </View>
                    <View style={styles.stockPriceContainer}>
                      <Text style={styles.stockPrice}>
                        <Text style={{color: 'grey'}}>$</Text>
                        {this.state.price.toLocaleString()}
                      </Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                          name={
                            BTC.market_data.price_change_percentage_24h.toFixed(
                              2,
                            ) > 0
                              ? 'caretup'
                              : 'caretdown'
                          }
                          type="antdesign"
                          color={
                            BTC.market_data.price_change_percentage_24h.toFixed(
                              2,
                            ) > 0
                              ? '#2FBE6A'
                              : '#E14C4C'
                          }
                          size={20}
                        />
                        <Text
                          style={{
                            color:
                              BTC.market_data.price_change_percentage_24h.toFixed(
                                2,
                              ) > 0
                                ? '#2FBE6A'
                                : '#E14C4C',
                            fontFamily: 'EuclidCircularA-Bold',
                            fontSize: 20,
                            marginLeft: '5%',
                          }}>
                          {BTC.market_data.price_change_percentage_24h.toFixed(
                            2,
                          )}
                          %
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.chartContainer}>
                    <LineChart
                      bezier
                      data={{
                        datasets: [
                          {
                            data: this.state.data.map(price =>
                              Number(price[1]),
                            ),
                          },
                        ],
                      }}
                      width={screenWidth}
                      height={200}
                      withDots={false}
                      withHorizontalLabels={false}
                      chartConfig={{
                        backgroundColor: '#0C0C0C',
                        backgroundGradientToOpacity: 1,
                        backgroundGradientFrom: '#0C0C0C',
                        backgroundGradientTo: '#0C0C0C',
                        useShadowColorFromDataset: false, // optional
                        barPercentage: 1,
                        barRadius: 360,
                        fillShadowGradientFromOpacity: 0,
                        fillShadowGradientToOpacity: 0,
                        strokeWidth: 2,
                        propsForBackgroundLines: {
                          strokeWidth: 0,
                        },

                        color: (opacity = 0) => '#CC9900',
                      }}
                      style={{paddingRight: 0, backgroundColor: 'transparent'}}
                    />
                  </View>
                </View>
                {/* <View style={styles.marketTrades}>
                  <View style={styles.subContents}>
                    <Text style={styles.marketText}>
                      Market Trades Appear Here
                    </Text>
                  </View>
                </View>
                <View style={styles.marketTrades}>
                  <View style={styles.subContents}>
                    <Text style={styles.marketText}>
                      Your Positions Appear Here
                    </Text>
                  </View>
                </View> */}
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
                            fontFamily: 'EuclidCircularA-Bold',
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
                          <Text
                            style={{
                              color: '#ffd700',
                              fontSize: 20,
                              fontFamily: 'EuclidCircularA-Bold',
                            }}>
                            BTC
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.usd}>
                  <TouchableOpacity
                    onPress={() => this.btcFirst()}
                    style={{
                      transform: [{rotate: '90deg'}],
                      position: 'absolute',
                      marginTop: '-10%',
                      alignSelf: 'center',
                    }}>
                    <Icon
                      reverse
                      name="swap"
                      type="antdesign"
                      color="#161616"
                      size={30}
                    />
                  </TouchableOpacity>
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
                            fontFamily: 'EuclidCircularA-Bold',
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
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 20,
                              fontFamily: 'EuclidCircularA-Bold',
                            }}>
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
            onPress={() =>
              transactions().openPosition(
                'BTC',
                this.state.btnSelected == 'short' ? 0 : 1,
                this.state.buyPrice,
                this.state.leverageValue,
                this.state.price,
                this.props.navigation,
              )
            }
            style={
              this.state.btnSelected == 'long' ||
              this.state.btnSelected == 'short'
                ? this.state.btnSelected == 'short'
                  ? styles.shortButton
                  : styles.longButton
                : {display: 'none'}
            }>
            {this.state.btnSelected == 'short' ? (
              <Text style={styles.confirmText}>Confirm Short</Text>
            ) : (
              <Text style={styles.confirmText}>Confirm Long</Text>
            )}
          </TouchableOpacity>
          <BottomNavbar
            navigation={this.props.navigation}
            selected="Investments"
          />
        </View>
      </View>
    );
  }
}

export default Investments;
