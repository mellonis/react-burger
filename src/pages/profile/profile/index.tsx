import cs from 'classnames';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import styles from './style.module.css';

const Profile = () => {
  const { path } = useRouteMatch();
  const match = useRouteMatch({ path, exact: true });

  return (
    <div className={styles['profile']}>
      <ul className={cs(styles['profile__menu'], 'text_color_inactive')}>
        <li
          className={cs(styles['profile__menu-item'], {
            [styles['profile__menu-item-active']]: match,
          })}
        >
          <Link className={styles['profile__link']} to={`${path}`}>
            Профиль
          </Link>
        </li>
        <li className={styles['profile__menu-item']}>
          <Link className={styles['profile__link']} to={`${path}/orders`}>
            История заказов
          </Link>
        </li>
        <li className={styles['profile__menu-item']}>
          <Link className={styles['profile__link']} to={`/logout`}>
            Выход
          </Link>
        </li>
      </ul>
      <div className={'pl-15'} />
      <div>Profile page</div>
    </div>
  );
};

export { Profile };
