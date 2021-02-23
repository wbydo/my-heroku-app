import * as React from 'react';
import { FC } from 'react';

import { TransactionSplit } from '@shared/graphql';

import './TransactionSplitsTable.scss';

type Props = {
  state: {
    selected: 'all' | 'some' | 'nothing';
    transactionSplits: Array<TransactionSplit & { selected: boolean }>;
    query: {
      accountNameLabel?: {
        id: string;
      };
    };
  };
  actions: {
    selectAll: () => void;
    toggleSelect: (id: string) => void;
    filterAccountLabel: (id: string) => void;
  };
};

const TransactionSplitsTable: FC<Props> = (props) => {
  const { state, actions } = props;
  return (
    <table className="transaction-splits-table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={state.selected === 'all'}
              onChange={() => {
                // TODO :消す
                console.log('hogehoge');
              }}
            />
          </th>
          <th className="transaction-splits-table__right-align-cell">id</th>
          <th className="transaction-splits-table__right-align-cell">
            transactionId
          </th>
          <th className="transaction-splits-table__right-align-cell">date</th>
          <th className="transaction-splits-table__left-align-cell">
            accountName
          </th>
          <th
            className={
              state.query.accountNameLabel == null
                ? 'transaction-splits-table__left-align-cell'
                : 'transaction-splits-table__left-align-cell--selected'
            }
          >
            {state.query.accountNameLabel == null ? (
              'accountNameLabel'
            ) : (
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  actions.selectAll();
                }}
              >
                accountNameLabel
              </a>
            )}
          </th>
          <th className="transaction-splits-table__right-align-cell">value</th>
          <th className="transaction-splits-table__left-align-cell">shop</th>
          <th className="transaction-splits-table__left-align-cell">
            description
          </th>
        </tr>
      </thead>
      <tbody>
        {state.transactionSplits.map((t) => {
          return (
            <tr key={t.id}>
              <td>
                <input
                  type="checkbox"
                  checked={t.selected}
                  onChange={() => actions.toggleSelect(t.id)}
                />
              </td>
              <td className="transaction-splits-table__right-align-cell">
                {t.id}
              </td>
              <td className="transaction-splits-table__right-align-cell">
                {t.transactionId}
              </td>
              <td className="transaction-splits-table__right-align-cell">
                {t.date}
              </td>
              <td className="transaction-splits-table__left-align-cell">
                {t.accountName}
              </td>
              <td className="transaction-splits-table__left-align-cell">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    actions.filterAccountLabel(t.id);
                  }}
                >
                  {t.accountNameLabel}
                </a>
              </td>
              <td className="transaction-splits-table__right-align-cell">
                {t.value}
              </td>
              <td className="transaction-splits-table__left-align-cell">
                {t.shop}
              </td>
              <td className="transaction-splits-table__left-align-cell">
                {t.description}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TransactionSplitsTable;
