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

import getOnlyProvider from '../../../particle-auth';
import usdcAbi from './USDC';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

export default async function transferXUSD(smartAccount) {
  const contractAddress = '0x650974DF6A3F6500DD531099c806Da2737f81d07';
  const usdcAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';

  const decimals = 6;

  const approvedAmount = ethers.utils.parseUnits('0.1', 18);

  const amount = ethers.utils.parseUnits('0.01', decimals);

  const fee = ethers.utils.parseUnits('0.0001', decimals);

  const contractInterface = new ethers.utils.Interface([
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

  const usdcAbi = new ethers.utils.Interface([
    'function approve(address _spender, uint256 _value)',
  ]);

  const recipient = '0xb0ff54808427d753F51B359c0ffc177242Fb4804';

  const approveData = usdcAbi.encodeFunctionData('approve', [
    contractAddress,
    approvedAmount,
  ]);

  const tx = {
    to: usdcAddress,
    data: approveData,
  };
  // send approve transaction

  const data = contractInterface.encodeFunctionData('transfer', [
    recipient,
    amount,
    fee,
  ]);

  const tx1 = {
    to: contractAddress,
    data: data,
  };

  try {
    // const approval = await smartAccount.sendTransaction({transaction: tx});
    // console.log('Tx Response', approval);
    // const txResponse = await smartAccount.sendTransaction({transaction: tx1});
    // console.log('userOp hash', txResponse);
  } catch (err) {
    console.log(err);
  }
  // // If you do not subscribe to listener, one can also get the receipt like shown below
  // const txReciept = await txResponse.wait();
  // console.log('Tx hash', txReciept.transactionHash);
}
