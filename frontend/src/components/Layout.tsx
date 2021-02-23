import * as React from 'react';
import { FC } from 'react';
import { Link, ReactRouteRecord } from 'rocon/react';

import { toplevelRoutes } from '../App';
import Navigation from './Navigation';
import './Layout.scss';

type Props = {
  route?: ReactRouteRecord<Record<string, unknown>>;
};
const Layout: FC<Props> = ({ route, children }) => {
  return (
    <div className="layout">
      <header>
        <Link route={toplevelRoutes.exactRoute}>Kakeyboo</Link>
      </header>
      <Navigation {...{ route }} />
      <div className="layout__contents">{children}</div>
      <footer></footer>
    </div>
  );
};

export default Layout;
