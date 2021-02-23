import * as React from 'react';
import { FC } from 'react';
import { ReactRouteRecord } from 'rocon/react';

import LinkListItem from './LinkListItem';
import { toplevelRoutes } from '../App';

type Props = {
  route?: ReactRouteRecord<Record<string, unknown>>;
};
const Navigation: FC<Props> = (props) => {
  return (
    <nav className="navigation">
      <ul>
        <LinkListItem
          activeRoute={props.route}
          thisRoute={toplevelRoutes._['transaction-splits']}
          label="TransactionSplits"
        />
        <LinkListItem
          activeRoute={props.route}
          thisRoute={toplevelRoutes._.hoge}
          label="Hoge"
        />
      </ul>
    </nav>
  );
};

export default Navigation;
