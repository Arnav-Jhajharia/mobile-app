// import createProvider from '../../../particle-auth';
// import xusdAbi from './USDC';
// const Web3 = require('web3');
// import {EvmService} from '../../../NetService/EvmService';
// import * as particleAuth from 'react-native-particle-auth';
// let web3;
// export default async function transferXUSD(authAddress) {
//   web3 = this.createProvider();

//   // Replace with your own values
// const tokenAddress = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';
// const contractAddress = '0x650974DF6A3F6500DD531099c806Da2737f81d07';

// const abi = [
//   {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
//   {
//     inputs: [],
//     name: 'token',
//     outputs: [{internalType: 'contract IERC20', name: '', type: 'address'}],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {internalType: 'address', name: 'recipient', type: 'address'},
//       {internalType: 'uint256', name: 'amount', type: 'uint256'},
//       {internalType: 'uint256', name: 'gas', type: 'uint256'},
//     ],
//     name: 'transfer',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'withdrawFees',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
// ];

//   const contract = new web3.eth.Contract(abi, contractAddress);
//   const tokenContract = new web3.eth.Contract(xusdAbi, tokenAddress);

// const recipient = '0xb02ccaf699f4708b348d2915e40a1fa31a2b4279';

//   const amount = web3.utils.toWei('0.2', 'mwei');

//   const gasPricePerUnit = await web3.eth.getGasPrice();

//   // const approvalGasPerUnit = await tokenContract.methods
//   //   .approve(contractAddress, web3.utils.toWei('1', 'wei'))
//   //   .estimateGas({from: authAddress});

//   // const approvalGasMATIC = String(approvalGasPerUnit * gasPricePerUnit);
//   // const approvalGasUSDC = web3.utils.toWei(
//   //   Number(web3.utils.fromWei(approvalGasMATIC, 'ether')).toFixed(6),
//   //   'mwei',
//   // );

//   // const contractGasPerUnit = await contract.methods
//   //   .transfer(
//   //     recipient,
//   //     web3.utils.toWei('1', 'wei'),
//   //     web3.utils.toWei('1', 'wei'),
//   //   )
//   //   .estimateGas({from: authAddress});
//   // const contractGasMATIC = String(contractGasPerUnit * gasPricePerUnit);
//   // const contractGasUSDC = web3.utils.toWei(
//   //   Number(web3.utils.fromWei(contractGasMATIC, 'ether')).toFixed(6),
//   //   'mwei',
//   // );

//   // const gasPriceUSDC = web3.utils.toWei(
//   //   String(Number(approvalGasUSDC) + Number(contractGasUSDC)),
//   //   'wei',
//   // );

//   // const netAmount = String(
//   //   Number((gasPriceUSDC / 100).toFixed(0)) + Number(amount),
//   // );

//   // console.log(gasPriceUSDC, String(approvalGasUSDC * 3));

//   // const approveTx = await tokenContract.methods
//   //   .approve(contractAddress, netAmount)
//   //   .send({
//   //     from: authAddress,
//   //   });

//   // console.log(
//   //   'Amount Approved:',
//   //   web3.utils.fromWei(
//   //     await tokenContract.methods
//   //       .allowance(authAddress, contractAddress)
//   //       .call(),
//   //     'mwei',
//   //   ),
//   // );

//   // const transactionTx = await contract.methods
//   //   .transfer(recipient, amount, gasPriceUSDC)
//   //   .send({
//   //     from: authAddress,
//   //   });

//   // console.log('Transfer Success:', transactionTx);

//   // const tx = await contract.methods.withdrawFees().send({from: authAddress});

//   // console.log('Withdraw successful:', tx.transactionHash);

//   console.log('APPROVE WORKS');
// }

import {ChainId} from '@biconomy/core-types';
import SmartAccount from '@biconomy/smart-account';
import getOnlyProvider from '../../../particle-auth';
import usdcAbi from './USDC';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

let options = {
  activeNetworkId: ChainId.POLYGON_MAINNET,
  supportedNetworksIds: [ChainId.POLYGON_MAINNET],

  networkConfig: [
    {
      chainId: ChainId.POLYGON_MAINNET,
      dappAPIKey: 'fHIUwHIg_.29bc814b-2915-4fad-ad08-bf049b1cada6',
    },
  ],
};

export default async function transferXUSD(smartAccount) {
  const tokenAddress = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';
  const contractAddress = '0x650974DF6A3F6500DD531099c806Da2737f81d07';

  const decimals = 6;
  const amount = ethers.utils.parseUnits('0.01', 6);

  console.log(amount);

  const erc20Interface = new ethers.utils.Interface([
    {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
    {
      inputs: [],
      name: 'token',
      outputs: [{internalType: 'contract IERC20', name: '', type: 'address'}],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {internalType: 'address', name: 'recipient', type: 'address'},
        {internalType: 'uint256', name: 'amount', type: 'uint256'},
        {internalType: 'uint256', name: 'gas', type: 'uint256'},
      ],
      name: 'transfer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdrawFees',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]);

  const recipient = '0xb02ccaf699f4708b348d2915e40a1fa31a2b4279';

  const usdcInterface = new ethers.utils.Interface(usdcAbi);

  const data = erc20Interface.encodeFunctionData('transfer', [
    recipient,
    amount,
    '0',
  ]);

  const tx1 = {
    to: contractAddress,
    data,
  };

  // const txResponse = await smartAccount.sendTransaction({transaction: tx1});

  // console.log(txResponse);
}
