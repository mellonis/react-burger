import cs from 'classnames';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import pageStyles from '../page-style.module.css';
import { Orders } from './orders';
import { Profile } from './profile';
import profilePageStyle from './style.module.css';

const profilePageClassname = 'profile-page';

const ProfilePage = () => {
  const { path } = useRouteMatch();

  return (
    <div
      className={cs(
        pageStyles['page'],
        pageStyles[`page_${profilePageClassname}`], // for BEM methodology accomplishments
        profilePageStyle[profilePageClassname],
        'pt-25'
      )}
    >
      <Switch>
        <Route exact path={`${path}`}>
          <Profile />
        </Route>
        <Route path={`${path}/orders`}>
          <Orders />
        </Route>
        <Route>
          <Redirect to={path} />
        </Route>
      </Switch>
    </div>
  );
};

export { ProfilePage };
