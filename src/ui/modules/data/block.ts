export type BlockType = {
  /* eslint-disable camelcase */
  blockNumber: number /* blknum */;
  difficulty: number /* uint64 */;
  finalized: boolean /* bool */;
  gasLimit: string /* gas */;
  gasUsed: string /* gas */;
  hash: string /* hash */;
  light: boolean /* bool */;
  miner: string /* address */;
  name: string /* string */;
  parentHash: string /* hash */;
  price: number /* double */;
  timestamp: number /* timestamp */;
  // transactions: array /* CTransactionArray */
  // tx_hashes: array /* CStringArray */
};
