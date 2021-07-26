import { uint64 } from '@modules/types';

export declare type Parameter = {
  type: string;
  name: string;
  str_default: string;
  value: string;
  indexed: boolean;
  internalType: string;
  components: string;
  no_write: boolean;
  is_flags: uint64;
  precision: uint64;
};
export declare type ParameterArray = Parameter[];
