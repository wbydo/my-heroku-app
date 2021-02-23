import * as React from 'react';
import { FC } from 'react';

import { RoconRoot, useRoutes, Path } from 'rocon/react';

import Layout from './components/Layout';
import TransactionSplitsTable from './components/TransactionSplitsTable';

import { useTransactionSplit } from './hooks/transaction-splits';

import './App.scss';

export const toplevelRoutes = Path()
  .exact({
    action: () => <Layout />,
  })
  .route('transaction-splits', (route) =>
    route.action(() => <TransactionSplits />)
  )
  .route('hoge', (route) => route.action(() => <p>hoge</p>));

const TransactionSplits: FC = () => {
  const props = useTransactionSplit();
  return (
    <Layout route={toplevelRoutes._['transaction-splits']}>
      <TransactionSplitsTable {...props} />
    </Layout>
  );
};

const Routes: FC = () => {
  return useRoutes(toplevelRoutes);
};

const App: FC = () => {
  return (
    <RoconRoot>
      <Routes />
    </RoconRoot>
  );
};

export default App;
