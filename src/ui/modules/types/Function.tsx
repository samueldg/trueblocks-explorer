import { hash } from '@modules/types';

export declare type Function = {
  encoding: hash;
  type: string;
  name: string;
  signature: string;
  input_names: string[];
  output_names: string[];
};
export declare type FunctionArray = Function[];
