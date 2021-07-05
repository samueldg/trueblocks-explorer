import { address, blknum, gas, hash, LogArray, wei } from '@modules/types';

export declare type Receipt = {
  blockHash: hash;
  blockNumber: blknum;
  contractAddress: address;
  cumulativeGasUsed: wei;
  from: address;
  gasUsed: gas;
  logs: LogArray;
  root: string;
  status: string;
  to: address;
  transactionHash: hash;
  transactionIndex: blknum;
};
export declare type ReceiptArray = Receipt[];
