import BigNumber from 'bignumber.js';
import {Buffer} from 'buffer';
import {EvmService} from './NetService/EvmService';

// export async function getEvmTokenTransaction(from) {
//     // mock a ethereum token transaction
//     // send 0.01 chain link token on ethereum goerli

//     const sender = from;
//     const receiver = "0x1a2EAF515a6ca05bfab9bf3d9850ea29e5C7882E";
//     const contractAddress = "0xA3C957f5119eF3304c69dBB61d878798B3F239D9";
//     const amount = "1000000000000000";

//     const data = await EvmService.erc20Transfer(contractAddress, receiver, amount);
//     console.log(`data = ${data}`);
//     const gasLimit = await EvmService.estimateGas(sender, contractAddress, "0x0", data);
//     console.log(`gasLimit = ${gasLimit}`);
//     const gasFeesResult = await EvmService.suggeseGasFee();
//     console.log(`gasFeesResult = ${gasFeesResult}`);

//     const maxFeePerGas = gasFeesResult.high.maxFeePerGas;
//     const maxFeePerGasHex = "0x" + BigNumber(maxFeePerGas * Math.pow(10, 9)).toString(16);

//     const maxPriorityFeePerGas = gasFeesResult.high.maxPriorityFeePerGas;
//     const maxPriorityFeePerGasHex = "0x" + BigNumber(maxPriorityFeePerGas * Math.pow(10, 9)).toString(16);
//     const chainId = ChainInfo.PolygonMumbai.chain_id;

//     const transaction = { from: sender, to: contractAddress, data: data, gasLimit: gasLimit, value: "0x0", type: "0x2", chainId: "0x" + chainId.toString(16), maxPriorityFeePerGas: maxPriorityFeePerGasHex, maxFeePerGas: maxFeePerGasHex }

//     console.log(transaction);
//     const json = JSON.stringify(transaction);
//     const serialized = Buffer.from(json).toString('hex');
//     return "0x" + serialized;
// }

export async function getEvmTokenTransaction(sender, receiver, amount) {
  const contractAddress = '0xA3C957f5119eF3304c69dBB61d878798B3F239D9';

  console.log(`sender = ${sender}, receiver = ${receiver}, amount = ${amount}`);
  const data = await EvmService.erc20Transfer(
    contractAddress,
    receiver,
    amount,
  );

  console.log(`data = ${data}`);
  const gasLimit = await EvmService.estimateGas(
    sender,
    contractAddress,
    '0x0',
    data,
  );
  console.log(`gasLimit = ${gasLimit}`);
  const gasFeesResult = await EvmService.suggeseGasFee();
  console.log(`gasFeesResult = ${gasFeesResult}`);

  const maxFeePerGas = gasFeesResult.high.maxFeePerGas;
  const maxFeePerGasHex =
    '0x' + BigNumber(maxFeePerGas * Math.pow(10, 9)).toString(16);

  console.log(`maxFeePerGas = ${maxFeePerGas}`);
  const maxPriorityFeePerGas = gasFeesResult.high.maxPriorityFeePerGas;

  console.log(`maxPriorityFeePerGas = ${maxPriorityFeePerGas}`);
  const maxPriorityFeePerGasHex =
    '0x' + BigNumber(maxPriorityFeePerGas * Math.pow(10, 9)).toString(16);

  const chainId = 80001;
  const transaction = {
    from: sender,
    to: contractAddress,
    data: data,
    gasLimit: gasLimit,
    value: '0x0',
    type: '0x2',
    chainId: '0x' + chainId.toString(16),
    maxPriorityFeePerGas: maxPriorityFeePerGasHex,
    maxFeePerGas: maxFeePerGasHex,
  };

  console.log(`transaction = ${transaction}`);
  const json = JSON.stringify(transaction);
  const serialized = Buffer.from(json).toString('hex');
  return '0x' + serialized;
}
