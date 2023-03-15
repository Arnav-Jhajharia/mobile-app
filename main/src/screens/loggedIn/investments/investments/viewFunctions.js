import { ethers, FixedNumber, BigNumber } from "ethers";
import clearingHouseABI from "../ABIs/ClearingHouse.json"
import clearingHouseViewerABI from "../ABIs/ClearingHouseViewer.json"

const clearingHouseViewerAddress = "clearingHouseViewerAddress";
const clearingHouseAddress = "clearingHouseAddress";

const provider = new ethers.providers.JsonRpcProvider("ALCHEMY_URL");
let userAccount: string;

const clearingHouse = new ethers.Contract(clearingHouseAddress, clearingHouseABI.abi, provider);
const clearingHouseViewer = new ethers.Contract(clearingHouseViewerAddress, clearingHouseViewerABI.abi, provider);


export async function displayPositions(amms:any) {
    let list: { position: any; leverage: ethers.FixedNumber; asset: any; side: string; unrealizedPnl: any; marginRatio: any; withdrawableMargin: any; entryPrice: ethers.FixedNumber; }[] = [];;

    for (let i=0; i < amms.length; i++) {
      // Look up position details from contract. Returns a `position` object
      try {
          let position =  await clearingHouseViewer.getPersonalPositionWithFundingPayment(amms[i], userAccount)
          .then(async (position:any) => {
          let leverage = FixedNumber.from(position.openNotional).divUnsafe(position.margin);
          let asset = position.amm;
          let side = position.size > 0 ? "LONG" : "SHORT";
          let unrealizedPnl = clearingHouseViewer.getUnrealizedPnl(amms[i], userAccount, 'SPOT_PRICE');
          let marginRatio = clearingHouseViewer.getMarginRatio(amms[i], userAccount);
          let withdrawableMargin = clearingHouseViewer.getFreeCollateral(amms[i], userAccount);
          const entryPrice = FixedNumber.from(position.openNotional).divUnsafe(position.size);
          [unrealizedPnl, marginRatio, withdrawableMargin] = await Promise.all([unrealizedPnl, marginRatio, withdrawableMargin]); 
    
          if (position.size != 0) {
            list.push({
                position: position,
                leverage: leverage, 
                asset: asset, 
                side: side, 
                unrealizedPnl: unrealizedPnl,
                marginRatio: marginRatio,
                withdrawableMargin: withdrawableMargin,
                entryPrice: entryPrice,
            }) 
          }
        });
      } catch {

      }
      return list;
    }
  }

  export default async function getSpotPrice(amm: string): Promise<number> {
    try {  
        let spotPrice = await clearingHouse.getSpotPrice(amm);
        return spotPrice;
    } catch(error) {
        return 0; 
    }

}

export async function getPositionDetails(amm: string) {
    let position =  await clearingHouseViewer.getPersonalPositionWithFundingPayment(amm, userAccount);
    return position
}
