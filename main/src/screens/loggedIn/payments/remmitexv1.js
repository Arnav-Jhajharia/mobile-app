// import xusdAbi from './USDC';
// import {EvmService} from '../../../NetService/EvmService';
// import * as particleAuth from 'react-native-particle-auth';
// export default async function transferXUSD(authAddress) {

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
import createProvider from '../../../particle-auth';
import usdAbi from './USDC';

// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';

// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

// Import the ethers library
import {ethers} from 'ethers';

const Web3 = require('web3');
let web3;

export default async function transferXUSD(smartAccount, provider) {
  const contractAddress = '0x650974DF6A3F6500DD531099c806Da2737f81d07';
  const usdcAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';

  const decimals = 6;

  const amount = ethers.utils.parseUnits('0.1', decimals);

  const recipient = '0xb0ff54808427d753F51B359c0ffc177242Fb4804';

  const contractAbi = [
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
  ];

  web3 = this.createProvider();

  const contract = new web3.eth.Contract(contractAbi, contractAddress);
  const tokenContract = new web3.eth.Contract(usdAbi, usdcAddress);

  const approvalCall = web3.eth.abi.encodeFunctionCall(usdAbi[1], [
    contractAddress,
    amount,
  ]);

  const transferCall = web3.eth.abi.encodeFunctionCall(contractAbi[2], [
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
    from: '0xB02CcaF699F4708B348d2915E40A1fa31A2B4279',
    to: contractAddress,
    data: transferCall,
  };

  const approvalGas = Number(await web3.eth.estimateGas(tx1));
  const transferGas = Number(await web3.eth.estimateGas(tx2));
  const gasPrice = Number(await web3.eth.getGasPrice());
  const gas = (approvalGas + transferGas) * gasPrice;
  const fees = web3.utils.toWei(String(gas), 'wei') * 5;
  const totalGas = String(
    Number(web3.utils.toWei(String(gas), 'wei')) +
      Number(web3.utils.toWei(String((fees * 0.01).toFixed(0)), 'wei')),
  );
  const totalGasUSDC = String(
    web3.utils.toWei(
      String((Number(web3.utils.fromWei(totalGas, 'ether')) * 5).toFixed(6)),
      'mwei',
    ),
  );

  // const approvalAmount = String(Number(amount) + Number(totalGasUSDC));
  const amountToApprove = ethers.utils.parseUnits(
    String(
      web3.utils.fromWei(
        Number(Number(amount.toString()) + Number(totalGasUSDC * 0.01)).toFixed(
          0,
        ),
        'mwei',
      ),
    ),
    decimals,
  );

  console.log('Amount:', web3.utils.fromWei(amount.toString(), 'mwei'));
  console.log('Total Gas:', web3.utils.fromWei(totalGas, 'ether'));
  console.log('Gas:', web3.utils.fromWei(String(gas), 'ether'));
  console.log(
    'Fees:',
    web3.utils.fromWei(String((fees * 0.01).toFixed(0)), 'ether'),
  );
  console.log(
    'Total Transaction:',
    web3.utils.fromWei(
      String(
        Number(
          web3.utils.toWei(
            String(web3.utils.fromWei(String(amount), 'mwei')),
            'ether',
          ),
        ) + Number(web3.utils.toWei(String(totalGas), 'wei')),
      ),
      'ether',
    ),
  );

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
