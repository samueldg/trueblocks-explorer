import { address, blknum, Function, hash } from '@modules/types';

export declare type Log = {
  address: address;
  blockHash: hash;
  blockNumber: blknum;
  logIndex: blknum;
  topics: string[];
  data: string;
  articulatedLog: Function;
  compressedLog: string;
  transactionHash: hash;
  transactionIndex: blknum;
  transactionLogIndex: blknum;
  type: string;
  removed: boolean;
};
export declare type LogArray = Log[];
