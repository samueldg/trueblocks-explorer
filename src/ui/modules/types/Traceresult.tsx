import {
  address,
  gas,
} from '@modules/types';

export declare type Traceresult = {
  newContract: address;
  code: string;
  gasUsed: gas;
  output: string;
};
export declare type TraceresultArray = Traceresult[];
