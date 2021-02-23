export { TransactionSplit } from '@shared/graphql';
export { isRecord } from '@shared/types';
export { isTransactionSplit } from '@shared/guards';

export type Query = {
  accountNameLabel?: {
    id: string;
  };
};
