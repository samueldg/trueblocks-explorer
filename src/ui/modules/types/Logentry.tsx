import { address, blknum, Function, hash, TopicArray } from '@modules/types';

export declare type Logentry = {
  address: address;
  blockHash: hash;
  blockNumber: blknum;
  logIndex: blknum;
  topics: TopicArray;
  data: string;
  articulatedLog: Function;
  compressedLog: string;
  transactionHash: hash;
  transactionIndex: blknum;
  transactionLogIndex: blknum;
  type: string;
  removed: boolean;
};
export declare type LogentryArray = Logentry[];
