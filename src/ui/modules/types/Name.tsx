import { address, Tag, uint64 } from '@modules/types';

export declare type Name = {
  address: address;
  decimals: uint64;
  deleted: boolean;
  description: string;
  is_contract: boolean;
  is_custom: boolean;
  is_erc20: boolean;
  is_erc721: boolean;
  is_prefund: boolean;
  name: string;
  source: string;
  symbol: string;
  tags: Tag;
};
export declare type NameArray = Name[];
