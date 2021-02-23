import { Action } from '../utilities';

import { TransactionSplit } from './types';
import * as actions from './actions';

export const reducer = (
  state: Array<TransactionSplit & { selected: boolean }>,
  action: Action<typeof actions>
): Array<TransactionSplit & { selected: boolean }> => {
  switch (action.type) {
    case 'setTransactionSplits':
      return action.payload.transactionSplitArray.map((i) => {
        return {
          ...i,
          selected: false,
        };
      });
    case 'toggleSelectById':
      return state.map((i) => {
        if (i.id === action.payload.id) {
          return {
            ...i,
            selected: !i.selected,
          };
        } else {
          return i;
        }
      });
  }
};
