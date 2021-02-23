import { Query } from './hooks/transaction-splits/types';

import { TransactionSplit } from '@shared/graphql';
import { isRecord } from '@shared/types';
import { isTransactionSplit } from '@shared/guards';

const hasData = (arg: unknown): arg is { data: unknown } => {
  return isRecord<{ data: unknown }>(arg) && arg.data != null;
};

const hasTransactionSplits = (
  arg: unknown
): arg is { transactionSplits: unknown } => {
  return (
    isRecord<{ transactionSplits: unknown }>(arg) &&
    arg.transactionSplits != null
  );
};

const hasList = (arg: unknown): arg is { list: unknown } => {
  return isRecord<{ list: unknown }>(arg) && arg != null;
};

const hasListSameAccountNameLabelById = (
  arg: unknown
): arg is { listSameAccountNameLabelById: unknown } => {
  return (
    isRecord<{ listSameAccountNameLabelById: unknown }>(arg) && arg != null
  );
};

export const fetchTransactionSplits = async (
  query: Query
): Promise<Array<TransactionSplit>> => {
  if (query.accountNameLabel == null) {
    const response = await fetch('./api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
      },
      body: `
      query AppQuery {
        transactionSplits {
          list {
            id
            transactionId
            date
            accountName
            accountNameLabel
            shop
            value
            description
          }
        }
      }
    `,
    });
    const json = await response.json();
    if (
      !(
        hasData(json) &&
        hasTransactionSplits(json.data) &&
        hasList(json.data.transactionSplits) &&
        Array.isArray(json.data.transactionSplits.list)
      )
    ) {
      console.log(json);
      throw new Error('Invalid type');
    }
    return json.data.transactionSplits.list.map((i: unknown) => {
      if (!isTransactionSplit(i)) {
        throw new Error('invalid type');
      }
      return i;
    });
  } else {
    const response = await fetch('./api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
      },
      body: `
      query AppQuery {
        transactionSplits {
          listSameAccountNameLabelById(id: ${query.accountNameLabel.id}) {
            id
            transactionId
            date
            accountName
            accountNameLabel
            shop
            value
            description
          }
        }
      }
    `,
    });
    const json = await response.json();
    if (
      !(
        hasData(json) &&
        hasTransactionSplits(json.data) &&
        hasListSameAccountNameLabelById(json.data.transactionSplits) &&
        Array.isArray(json.data.transactionSplits.listSameAccountNameLabelById)
      )
    ) {
      console.log(json);
      throw new Error('Invalid type');
    }
    return json.data.transactionSplits.listSameAccountNameLabelById.map(
      (i: unknown) => {
        if (!isTransactionSplit(i)) {
          throw new Error('invalid type');
        }
        return i;
      }
    );
  }
};
