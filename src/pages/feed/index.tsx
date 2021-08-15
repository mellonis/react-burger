import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { OrderDetails } from '../../components/order-details';
import { FeedPage } from './feed';

const FeedPageSwitcher = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <FeedPage />
      </Route>
      <Route path={`${path}/:id`}>
        <OrderDetails />
      </Route>
      <Route>
        <Redirect to={path} />
      </Route>
    </Switch>
  );
};

export { FeedPageSwitcher };
