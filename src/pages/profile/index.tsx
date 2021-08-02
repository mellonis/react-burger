import cs from 'classnames';
import React from 'react';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

import pageStyles from '../page-style.module.css';
import { Orders } from './orders';
import { Profile } from './profile';
import profilePageStyle from './style.module.css';

const profilePageClassname = 'profile-page';

const ProfilePage = () => {
  const { userTimeStamp } = useAppSelector((state) => state.user);
  const { path } = useRouteMatch();
  const match = useRouteMatch({ path, exact: true });

  return (
    <div
      className={cs(
        pageStyles['page'],
        pageStyles[`page_${profilePageClassname}`], // for BEM methodology accomplishments
        profilePageStyle[profilePageClassname],
        'pt-25'
      )}
    >
      <ul
        className={cs(
          profilePageStyle[`${profilePageClassname}__menu`],
          'text_color_inactive'
        )}
      >
        <li
          className={cs(
            profilePageStyle[`${profilePageClassname}__menu-item`],
            {
              [profilePageStyle[`${profilePageClassname}__menu-item-active`]]:
                match,
            }
          )}
        >
          <Link
            className={profilePageStyle[`${profilePageClassname}__link`]}
            to={`${path}`}
          >
            Профиль
          </Link>
        </li>
        <li className={profilePageStyle[`${profilePageClassname}__menu-item`]}>
          <Link
            className={profilePageStyle[`${profilePageClassname}__link`]}
            to={`${path}/orders`}
          >
            История заказов
          </Link>
        </li>
        <li className={profilePageStyle[`${profilePageClassname}__menu-item`]}>
          <Link
            className={profilePageStyle[`${profilePageClassname}__link`]}
            to={`/logout`}
          >
            Выход
          </Link>
        </li>
      </ul>
      <div className={'pl-15'} />
      <div className={profilePageStyle[`${profilePageClassname}__content`]}>
        <Switch>
          <Route exact path={`${path}`}>
            <Profile key={userTimeStamp} />
          </Route>
          <Route path={`${path}/orders`}>
            <Orders />
          </Route>
          <Route>
            <Redirect to={path} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export { ProfilePage };
