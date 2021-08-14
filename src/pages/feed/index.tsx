import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { FeedPage } from './feed';

const FeedPageSwitcher = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <FeedPage />
      </Route>
      <Route path={`${path}/:id`}>Feed Page / orderId</Route>
      <Route>
        <Redirect to={path} />
      </Route>
    </Switch>
  );
};

export { FeedPageSwitcher };
