import { TransactionSplit } from './types';

export const setTransactionSplits = (
  transactionSplitArray: Array<TransactionSplit>
) => {
  return {
    type: 'setTransactionSplits' as const,
    payload: {
      transactionSplitArray,
    },
  };
};

export const toggleSelectById = (id: string) => {
  return {
    type: 'toggleSelectById' as const,
    payload: {
      id,
    },
  };
};
