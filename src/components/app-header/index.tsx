import React from 'react';
import cs from 'classnames';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { lexemes } from '../../consts';
import MenuItem from './menu-item';

import styles from './style.module.css';

const AppHeader = () => {
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
            text={lexemes.constructor}
          />
          <MenuItem
            className={styles['app-header__menu-item']}
            Icon={ListIcon}
            isActive={false}
            text={lexemes.orderList}
          />
          <li className={styles['app-header__logo-wrapper']}>
            <Logo />
          </li>
          <MenuItem
            className={styles['app-header__menu-item']}
            Icon={ProfileIcon}
            isActive={false}
            text={lexemes.profile}
          />
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
