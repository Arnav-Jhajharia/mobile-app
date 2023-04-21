import createProvider from '../../../particle-auth';
import usdAbi from './USDC';

import 'react-native-get-random-values';
import '@ethersproject/shims';
import {ethers} from 'ethers';

import * as particleAuth from 'react-native-particle-auth';

const Web3 = require('web3');
let web3;

export default async function transferXUSD(
  smartAccount,
  provider,
  _amount,
  _recipient,
) {
  const contractAddress = '0x643FE99eD6A983595FC89FB66A5ba07FBa1Fd491';
  const usdcAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';

  const decimals = 6;

  const amount = ethers.utils.parseUnits(_amount, decimals);

  const recipient = _recipient;

  const contractAbi = [
    {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{internalType: 'address', name: '', type: 'address'}],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
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
        {internalType: 'uint256', name: 'fee', type: 'uint256'},
      ],
      name: 'transfer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
      name: 'transferOwnership',
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
  ];

  web3 = this.createProvider();

  // console.log('Works');

  const contract = new web3.eth.Contract(contractAbi, contractAddress);
  const tokenContract = new web3.eth.Contract(usdAbi, usdcAddress);

  const approvalCall = web3.eth.abi.encodeFunctionCall(usdAbi[1], [
    contractAddress,
    amount,
  ]);

  const transferCall = web3.eth.abi.encodeFunctionCall(contractAbi[5], [
    recipient,
    amount,
    '0',
  ]);

  const tx1 = {
    from: smartAccount.address,
    to: usdcAddress,
    data: approvalCall,
  };

  const tx2 = {
    from: smartAccount.address,
    to: contractAddress,
    data: transferCall,
  };

  const approvalGas = Number(await web3.eth.estimateGas(tx1));
  const transferGas = Number('110809');
  const gasPrice = Number(await web3.eth.getGasPrice());
  const gas = (approvalGas + transferGas) * gasPrice;
  const fees = web3.utils.toWei(String(gas), 'wei') * 5;
  const totalGas = String(
    Number(web3.utils.toWei(String(gas), 'wei')) +
      Number(web3.utils.toWei(String((fees * 0.01).toFixed(0)), 'wei')),
  );
  const totalGasUSDC = web3.utils.toWei(
    String(Number(web3.utils.fromWei(totalGas, 'ether')).toFixed(5)),
    'mwei',
  );
  // const approvalAmount = String(Number(amount) + Number(totalGasUSDC));
  const amountToApproveUSD = web3.utils.fromWei(
    String(
      Number(
        web3.utils.toWei(
          String(web3.utils.fromWei(String(amount), 'mwei')),
          'ether',
        ),
      ) +
        Number(
          web3.utils.toWei(
            String(web3.utils.fromWei(String(totalGasUSDC), 'mwei')),
            'ether',
          ),
        ),
      'ether',
    ),
  );

  const amountToApprove = web3.utils.toWei(
    Number(amountToApproveUSD).toFixed(6),
    'mwei',
  );

  console.log('Amount:', web3.utils.fromWei(amount.toString(), 'mwei'));
  console.log('Gas:', web3.utils.fromWei(String(gas), 'ether'));
  console.log(
    'Fees:',
    web3.utils.fromWei(String((fees * 0.01).toFixed(0)), 'ether'),
  );
  console.log('Total Gas:', web3.utils.fromWei(totalGas, 'ether'));
  console.log(
    'Total Transaction:',
    web3.utils.fromWei(amountToApprove, 'mwei'),
  );
  console.log('Total Gas USDC:', totalGasUSDC.toString());
  console.log('Amount To Approve:', amountToApprove);

  const contractInterface = new ethers.utils.Interface(contractAbi);

  const usdcAbi = new ethers.utils.Interface(usdAbi);

  const v1Batch = [];

  const approveData = usdcAbi.encodeFunctionData('approve', [
    contractAddress,
    amountToApprove,
  ]);

  const approve = {
    to: usdcAddress,
    data: approveData,
  };

  v1Batch.push(approve);

  const transferData = contractInterface.encodeFunctionData('transfer', [
    recipient,
    amount,
    totalGasUSDC,
  ]);

  const transfer = {
    to: contractAddress,
    data: transferData,
  };

  v1Batch.push(transfer);

  try {
    // const txResponse = await smartAccount.sendTransactionBatch({
    //   transactions: v1Batch,
    // });
    // console.log('Response:', txResponse);
  } catch (err) {
    console.log(err);
  }
}

