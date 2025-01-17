import { address, blknum, bytes32, gas, hash, LogentryArray, wei } from '@modules/types';

export declare type Receipt = {
  blockHash: hash;
  blockNumber: blknum;
  contractAddress: address;
  cumulativeGasUsed: wei;
  from: address;
  gasUsed: gas;
  effectiveGasPrice: gas;
  logs: LogentryArray;
  root: bytes32;
  status: string;
  to: address;
  transactionHash: hash;
  transactionIndex: blknum;
};
export declare type ReceiptArray = Receipt[];
