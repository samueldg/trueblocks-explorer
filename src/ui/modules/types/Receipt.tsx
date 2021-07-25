import { LogArray, address, blknum, gas, hash, wei } from '@modules/types';

export declare type Receipt = {
  blockHash: hash;
  blockNumber: blknum;
  contractAddress: address;
  cumulativeGasUsed: wei;
  from: address;
  gasUsed: gas;
  effectiveGasPrice: gas;
  logs: LogArray;
  root: string;
  status: string;
  to: address;
  transactionHash: hash;
  transactionIndex: blknum;
};
export declare type ReceiptArray = Receipt[];
