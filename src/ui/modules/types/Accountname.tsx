import { address, uint64 } from '@modules/types';

export declare type Accountname = {
  tags: string;
  address: address;
  name: string;
  symbol: string;
  source: string;
  decimals: uint64;
  description: string;
  is_custom: boolean;
  is_prefund: boolean;
  is_contract: boolean;
  is_erc20: boolean;
  is_erc721: boolean;
  deleted: boolean;
};
export declare type AccountnameArray = Accountname[];
