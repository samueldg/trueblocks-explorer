import {
  address,
  gas,
  wei,
} from '@modules/types';

export declare type Traceaction = {
  selfDestructed: address;
  balance: wei;
  callType: string;
  from: address;
  gas: gas;
  init: string;
  input: string;
  refundAddress: address;
  to: address;
  value: wei;
};
export declare type TraceactionArray = Traceaction[];
