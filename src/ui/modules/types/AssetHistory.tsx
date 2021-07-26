import { address, BalanceArray } from '@modules/types';

export declare type AssetHistory = {
  color: string;
  assetAddr: address;
  assetSymbol: string;
  history: BalanceArray;
};
