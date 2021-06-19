import React from 'react';
import cs from 'classnames';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './style.module.css';
import MenuItem from './menu-item';

const AppHeader = () => {
  return (
    <header className={cs(styles['app-header'], 'text_type_main-default')}>
      <nav>
        <ul className={cs(styles['app-header__menu-list'], 'pt-4 pb-4')}>
          <MenuItem
            className={styles['app-header__menu-item']}
            Icon={BurgerIcon}
            text="Конструктор"
          />
          <MenuItem
            className={styles['app-header__menu-item']}
            Icon={ListIcon}
            isActive={false}
            text="Лента заказов"
          />
          <li className={styles['app-header__logo-wrapper']}>
            <Logo />
          </li>
          <MenuItem
            className={styles['app-header__menu-item']}
            Icon={ProfileIcon}
            isActive={false}
            text="Личный кабинет"
          />
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
