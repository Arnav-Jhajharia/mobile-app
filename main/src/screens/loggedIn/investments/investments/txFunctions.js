import contracts from './constants'
import { ethers, FixedNumber, BigNumber } from "ethers";
import * as particleAuth from "react-native-particle-auth";
import ClearingHouseABI from "../ABIs/ClearingHouse.json"
import { displayPositions, getPositionDetails } from "./viewFunctions";
import axios from "axios";

const provider = new ethers.providers.JsonRpcProvider("ALCHEMY_URL");
let userAccount: string;
const clearingHouseAddress = "clearingHouseAddress";
const usdcAddress = "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747"; //USDC on Mumbai testnet

const clearingHouse = new ethers.Contract(clearingHouseAddress, ClearingHouseABI.abi, provider);

const transactions = (username: string, password: string) => {

    const openPosition = async (
        amm: string, side: string, 
        quoteAssetAmounti: string, 
        leveragei: string, 
        baseAssetAmountLimiti: string
        ) => {

        const Amm = getAmmAddress(amm);
        const quoteAssetAmount = FixedNumber.from(quoteAssetAmounti);
        const leverage = FixedNumber.from(leveragei);
        const baseAssetAmountLimit =  FixedNumber.from(baseAssetAmountLimiti);
    
        (async () => {
            const response = await axios.post('https://rpc.particle.network/evm-chain', {
                chainId: 80001,
                jsonrpc: '2.0',
                id: 1,
                method: "particle_abi_encodeFunctionCall",
                params: [
                    usdcAddress, 
                    "erc20_approve", 
                    [
                        clearingHouseAddress, 
                        quoteAssetAmounti
                    ]
                ]
            },
            {
                auth: {
                    username: username,
                    password: password,
                }
            });
            console.log(response.data);
        })().then( async () => {
                const response = await axios.post('https://rpc.particle.network/evm-chain', {
                    chainId: 80001,
                    jsonrpc: '2.0',
                    id: 1,
                    method: "particle_abi_encodeFunctionCall",
                    params: [
                        clearingHouseAddress, 
                        "custom_openPosition", 
                        [
                            Amm, side, quoteAssetAmount, leverage, baseAssetAmountLimit
                        ]
                    ]
                }, {
                    auth: {
                        username: username,
                        password: password,
                    }
                });
                const txString: string = response.data.result;
                try {
                    const txResult = await particleAuth.signAndSendTransaction(txString);
                    console.log(txResult)
                    return txResult;
                } catch (error) {
                    console.log(error)
                    return 0;
                }      
            });
        
        // Retrieve position details for display
        displayPositions(Amm)
    }
    
    /** 
    * @param amm  asset symbol in caps
    * @param slippage  max variance from expected amount, Default: 0.5%
    */
    const closePosition = async (amm: string, slippage: number = 0.5) => {
        getPositionDetails(amm)
        .then(async (position) => {
            const Amm = getAmmAddress(amm);
            const margin = FixedNumber.from(position.margin);
            const _slippage = margin.mulUnsafe(FixedNumber.from(slippage).divUnsafe(100)); 
            const quoteAssetAmountLimit = margin.subUnsafe(_slippage);
    
            const response = await axios.post('https://rpc.particle.network/evm-chain', {
                chainId: 80001,
                jsonrpc: '2.0',
                id: 1,
                method: "particle_abi_encodeFunctionCall",
                params: [
                    clearingHouseAddress, 
                    "custom_closePosition", 
                    [
                        Amm, 
                        quoteAssetAmountLimit
                    ]
                ]
            }, {
                auth: {
                    username: username,
                    password: password,
                }
            });
            const txString: string = response.data.result;
            try {
                const txResult = await particleAuth.signAndSendTransaction(txString);
                console.log(txResult)
                return txResult;
            } catch (error) {
                console.log(error)
                return 0;
            }
        });
        const Amm = getAmmAddress(amm)
        displayPositions(Amm)
    }
    
    
    /*
    //Add or remove margin from an open position 
    // NB: would not affect position size. Instead, leverage is adjusted accordingly
    PARAMETERS:
    * amm => String(asset symbol IN CAPS)
    * amount => Number(amount of margin to remove)
    * dir => Number(0 or 1. Implement as a switch, 0 for remove, 1 for add)
    */
    const adjustMargin = async (amm: string, amount: string, dir: number) => {
        getPositionDetails(amm)
        .then(async (position) => {
            const margin =FixedNumber.from(position.margin).addUnsafe(amount);
            const leverage = FixedNumber.from(position.size).divUnsafe(margin);
            const _amount = FixedNumber.from(amount);
            const Amm = getAmmAddress(amm);
            let method;
            if (dir) {
                method = 'addMargin'
            } else {
                method = 'removeMargin' 
            }
    
            const response = await axios.post('https://rpc.particle.network/evm-chain', {
                chainId: 80001,
                jsonrpc: '2.0',
                id: 1,
                method: "particle_abi_encodeFunctionCall",
                params: [
                    clearingHouseAddress, 
                    `custom_${method}`, 
                    [
                        Amm, 
                        amount
                    ]
                ]
            }, {
                auth: {
                    username: username,
                    password: password,
                }
            });
            const txString: string = response.data.result;
            try {
                const txResult = await particleAuth.signAndSendTransaction(txString);
                console.log(txResult)
                return txResult;
            } catch (error) {
                console.log(error)
                return 0;
            }
        });
        const Amm = getAmmAddress(amm)
        displayPositions(Amm)
    }
    
    //Get users position history
    const getPositionHistory = async () => {
        await clearingHouse.queryFilter(positionClosed, 0, "latest")
        .then((events: any) => {
            for (let i = 0; i < events.length; i++){
                getPosition(events[i]);
            }
        })
    }
    
    const getPosition = (object: any) => {
        const amm = contracts[0].symbol;
        const margin = object.args.margin;
        const PositionNotional = object.args.positionNotional;
        const PositionSize = object.args.exchangedPositionSize;
        const Fee = object.args.fee;
        const PositionSizeAfterTransaction = object.args.positionSizeAfter;
        const RealizedPnL = object.args.realizedPnl;
        const LiquidationPenalty = object.args.liquidationPenalty;
        const SpotPrice = object.args.spotPrice;
        const FundingPayment = object.args.fundingPayment;
    
        return { amm, margin, PositionNotional, PositionSize, Fee, PositionSizeAfterTransaction, RealizedPnL, LiquidationPenalty, SpotPrice, FundingPayment }
    }
    
    /**
     * Get AMM address by asset symbol
     * @param amm Asset symbol in caps
     * @returns string- AMM address
     */
    const getAmmAddress = (amm: string) => {
        for (let i=0; i < contracts.length; i++) {
            if (contracts[i].symbol == amm) {
                return contracts[i].address
            }
        }
    }
    
    const positionClosed = clearingHouse.filters.PositionChanged(userAccount,null, null, null, null, null, BigNumber.From(0));
    
    return { openPosition, closePosition, adjustMargin, getPositionHistory}
}

export default transactions