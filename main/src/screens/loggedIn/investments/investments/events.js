// import contracts from './constants';
// import {ethers, BigNumber} from 'ethers';
import clearingHouseABI from '../ABIs/ClearingHouse.json';
import AMM_ABI from '../ABIs/AMM.json';
import {REACT_APP_ALCHEMY_URL} from '@env';
import createProvider from '../../../../particle-auth';

function test() {
  let web3;
  if (global.withAuth) {
    user = global.loginAccount.publicAddress;
    web3 = this.createProvider();
    console.log(web3);
    console.log('Local Account:', authAddress);
    console.log('Auth Account:', global.withAuth);
  } else {
    authAddress = global.connectAccount.publicAddress;
    console.log('Global Account:', global.connectAccount);
    console.log('Global Wallet Type:', global.walletType);
  }
}

export default test;

// const clearingHouseAddress = 'clearingHouseAddress';
// const btcAmmAddr = '';
// const provider = new ethers.providers.JsonRpcProvider(REACT_APP_ALCHEMY_URL);
// let userAccount;

// const clearingHouse = new ethers.Contract(
//   clearingHouseAddress,
//   clearingHouseABI.abi,
//   provider,
// );
// const btcAmm = new ethers.Contract(btcAmmAddr, AMM_ABI.abi, provider);

// //Filters
// const positionClosed = clearingHouse.filters.PositionChanged(
//   userAccount,
//   null,
//   null,
//   null,
//   null,
//   null,
//   BigNumber.From(0),
// );
// const positionLiquidated =
//   clearingHouse.filters.PositionLiquidated(userAccount);
// const marginChanged = clearingHouse.filters.MarginChanged(userAccount);

// //Events
// clearingHouse
//   .on(
//     positionClosed,
//     (
//       trader,
//       amm,
//       margin,
//       positionNotional,
//       exchangedPositionSize,
//       fee,
//       positionSizeAfter,
//       realizedPnl,
//       unrealizedPnl,
//       badDebt,
//       liquidationPenalty,
//       spotPrice,
//       fundingPayment,
//     ) => {
//       console.log(
//         `Position Liquidated =>
//        Pair:${contracts[0].symbol}
//        Margin: ${margin}
//        Position Notional:${positionNotional}
//        Position Size:${exchangedPositionSize}
//        Fee: ${fee}
//        Position Size After Transaction: ${positionSizeAfter}
//        Realized PnL: ${realizedPnl}
//        Unrealized PnL: ${unrealizedPnl}
//        Bad Debt: ${badDebt}
//        Liquidation Penalty: ${liquidationPenalty}
//        Spot Price: ${spotPrice}
//        Funding Payment : ${fundingPayment}`,
//       );
//     },
//   )
//   .on('error', console.error);

// clearingHouse.on(
//   positionLiquidated,
//   (
//     trader,
//     amm,
//     positionNotional,
//     positionSize,
//     liquidationFee,
//     liquidator,
//     badDebt,
//   ) => {
//     console.log(
//       `Position Liquidated =>
//        Pair:${contracts[0].symbol}
//        Position Notional:${positionNotional}
//        Position Size:${positionSize}
//        Liquidation Fee:${liquidationFee}
//        <li>Liquidator: ${liquidator}
//        Bad Debt: ${badDebt}`,
//     );
//     // Clear positions display after this
//   },
// );

// clearingHouse.on(marginChanged, (sender, amm, amount, fundingPayment) => {
//   console.log(
//     `Margin Changed =>
//      Pair:${contracts[0].symbol}
//      Amount:${amount}
//      Funding Payment:${fundingPayment}`,
//   );
// });

// clearingHouse.on(RestrictionModeEntered, (amm, blockNumber) => {
//   console.log(
//     `RestrictionMode Entered =>
//      Pair:${contracts[0].symbol}
//      Block Number:${blockNumber}`,
//   );
// });

// btcAmm.on(FundingRateUpdated, (rate, underlyingPrice) => {
//   console.log(`BTC Funding Rate Updated =>
//      Funding Rate:${rate}
//      Underlying Price:${underlyingPrice}`);
// });
