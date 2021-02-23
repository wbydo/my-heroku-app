import { useEffect, useState, useReducer } from 'react';
import { TransactionSplit, Query } from './types';
import { reducer } from './reducer';
import * as actions from './actions';
import { fetchTransactionSplits } from '../../external';

const fetchTransactionSplitsWrapper = async (
  query: Query,
  setFunction: (arg: Array<TransactionSplit>) => void
) => {
  const arr = await fetchTransactionSplits(query);
  setFunction(arr);
};

export const useTransactionSplit = () => {
  const [tsArray, dispatch] = useReducer(reducer, []);
  const [query, setQuery] = useState<Query>({});

  useEffect(() => {
    fetchTransactionSplitsWrapper(query, (arg) =>
      dispatch(actions.setTransactionSplits(arg))
    );
  }, [query]);

  return {
    state: {
      //TODO: 可変に
      selected: 'nothing' as const,
      transactionSplits: tsArray,
      query,
    },
    actions: {
      selectAll: () => {
        setQuery({});
      },
      toggleSelect: (id: string) => dispatch(actions.toggleSelectById(id)),

      // TODO: reducerにいれる
      filterAccountLabel: (id: string) =>
        setQuery({ accountNameLabel: { id } }),
    },
  };
};
