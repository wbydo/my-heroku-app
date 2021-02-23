import { Connection } from 'typeorm';

import { TransactionSplitRepository } from './db/repositories/TransactionSplitRepository';
import { dayjs } from './dayjs';

import {
  Resolvers,
  TransactionSplit as GraphQLTransactionSplit,
  TransactionSplitQueryResolvers,
} from '@shared/graphql';

import { LogicalError } from '@shared/error';

const transactionSplitQueryResolvers: TransactionSplitQueryResolvers<{
  dbConnection: Connection;
}> = {
  list: async (
    parents,
    arg,
    context,
    info
  ): Promise<Array<GraphQLTransactionSplit>> => {
    const transactionSplitRepository = context.dbConnection.getCustomRepository(
      TransactionSplitRepository
    );

    return (await transactionSplitRepository.findAll()).map((i) => {
      if (i.id == null || i.transactionId == null) {
        throw new LogicalError();
      }

      return {
        id: i.id.toString(),
        date: dayjs(i.date).format('YYYY/MM/DD'),
        transactionId: i.transactionId,
        accountName: i.account.name,
        accountNameLabel: i.accountName,
        shop: i.shop,
        value: i.value,
        description: i.description,
      };
    });
  },

  listSameAccountNameLabelById: async (
    parents,
    arg,
    context,
    info
  ): Promise<Array<GraphQLTransactionSplit>> => {
    const transactionSplitRepository = context.dbConnection.getCustomRepository(
      TransactionSplitRepository
    );

    if (arg.id == null) {
      throw new Error('hogehogehogehoge');
    }

    return (
      await transactionSplitRepository.findSameAccountNameLabelById(arg.id)
    ).map((i) => {
      if (i.id == null || i.transactionId == null) {
        throw new LogicalError();
      }

      return {
        id: i.id.toString(),
        date: dayjs(i.date).format('YYYY/MM/DD'),
        transactionId: i.transactionId,
        accountName: i.account.name,
        accountNameLabel: i.accountName,
        shop: i.shop,
        value: i.value,
        description: i.description,
      };
    });
  },
};

// 参考: https://khalilstemmler.com/blogs/graphql/nested-graphql-resolvers/
export const resolvers: Resolvers<{ dbConnection: Connection }> = {
  TransactionSplitQuery: transactionSplitQueryResolvers,
  Query: {
    helloQ: (parents, arg, context, info): string => {
      return arg.name == null ? 'hello!?????!!!!!!!' : `hello ${arg.name}!!`;
    },
    transactionSplits: (parents, arg, context, info) => ({
      list: [],
      listSameAccountNameLabelById: [],
    }),
  },
  Mutation: {
    helloM: (parents, arg, context, info): string => {
      return arg.name == null ? 'hello!!' : `hello ${arg.name}!!`;
    },
  },
};
