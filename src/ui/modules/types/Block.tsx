import { address, blknum, date, double, gas, hash, timestamp, TransactionArray, uint64 } from '@modules/types';

export declare type Block = {
  blockNumber: blknum;
  unclesCnt: uint64;
  difficulty: uint64;
  finalized: boolean;
  gasLimit: gas;
  gasUsed: gas;
  hash: hash;
  light: boolean;
  miner: address;
  name: string;
  date: date;
  parentHash: hash;
  price: double;
  timestamp: timestamp;
  transactions: TransactionArray;
  tx_hashes: string[];
  extraData: string;
};
export declare type BlockArray = Block[];
