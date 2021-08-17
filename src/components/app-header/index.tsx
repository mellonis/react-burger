import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cs from 'classnames';
import React, { FC } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { lexemes } from '../../consts';
import { MenuItem } from './menu-item';
import styles from './style.module.css';

const AppHeader: FC = () => {
  const history = useHistory();
  const mainPageMatch = useRouteMatch('/');
  const feedPageMatch = useRouteMatch('/feed');
  const profilePageMatch = useRouteMatch('/profile');

  return (
    <header
      className={cs(
        styles['app-header'],
        'text text_type_main-default pt-3 pb-3'
      )}
    >
      <nav>
        <ul className={cs(styles['app-header__menu-list'], 'pt-4 pb-4')}>
          <MenuItem
            className={styles['app-header__menu-item']}
            Icon={BurgerIcon}
            isActive={(mainPageMatch && mainPageMatch.isExact) ?? false}
            onClick={() => {
              history.push({
                pathname: '/',
              });
            }}
            text={lexemes.constructor}
          />
          <MenuItem
            className={styles['app-header__menu-item']}
            Icon={ListIcon}
            isActive={Boolean(feedPageMatch)}
            onClick={() => {
              history.push({
                pathname: '/feed',
              });
            }}
            text={lexemes.orderList}
          />
          <li className={styles['app-header__logo-wrapper']}>
            <Link to={'/'}>
              <Logo />
            </Link>
          </li>
          <MenuItem
            className={styles['app-header__menu-item']}
            Icon={ProfileIcon}
            isActive={Boolean(profilePageMatch)}
            onClick={() => {
              history.push({
                pathname: '/profile',
              });
            }}
            text={lexemes.profile}
          />
        </ul>
      </nav>
    </header>
  );
};

export { AppHeader };
