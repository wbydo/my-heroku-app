import * as React from 'react';
import { FC } from 'react';
import { Link, ReactRouteRecord } from 'rocon/react';

import classNames from 'classnames';

type Props = {
  activeRoute?: ReactRouteRecord<Record<string, unknown>>;
  thisRoute: ReactRouteRecord<Record<string, unknown>>;
  label: string;
};

const LinkListItem: FC<Props> = (props) => {
  const { activeRoute, thisRoute, label } = props;
  return (
    <li
      className={classNames({
        selected: activeRoute != null && activeRoute === thisRoute,
      })}
    >
      <Link route={thisRoute}>{label}</Link>
    </li>
  );
};

export default LinkListItem;
