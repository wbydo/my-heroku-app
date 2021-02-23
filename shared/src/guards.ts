import { isRecord } from './types';
import { TransactionSplit } from './graphql';

const hasShop = (arg: unknown): arg is { shop: unknown } => {
  return isRecord<{ shop: unknown }>(arg) && arg.shop != null;
};

const hasDescription = (arg: unknown): arg is { description: unknown } => {
  return isRecord<{ description: unknown }>(arg) && arg.description != null;
};

export const isTransactionSplit = (arg: unknown): arg is TransactionSplit => {
  if (hasShop(arg) && typeof arg.shop !== 'string') {
    return false;
  }
  if (hasDescription(arg) && typeof arg.description !== 'string') {
    return false;
  }
  return (
    isRecord<TransactionSplit>(arg) &&
    typeof arg.id === 'string' &&
    typeof arg.transactionId === 'number' &&
    typeof arg.date === 'string' &&
    typeof arg.accountName === 'string' &&
    typeof arg.accountNameLabel === 'string' &&
    typeof arg.value === 'number'
  );
};
