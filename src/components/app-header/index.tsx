import React from 'react'
import cs from 'classnames';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './style.module.css'

const AppHeader = () => {
    return (<header className={cs(styles['app-header'], 'text_type_main-default')}>
        <nav>
            <ul className={cs(styles['app-header__menu-list'], 'pt-4 pb-4')}>
                <li className={cs(styles['app-header__menu-item'], 'p-5')}>
                    <BurgerIcon type={"primary"}/>
                    <span className="ml-2">Конструктор</span>
                </li>
                <li className={cs(styles['app-header__menu-item'], 'p-5', 'text_color_inactive')}>
                    <ListIcon type={"secondary"}/>
                    <span className="ml-2">Лента заказов</span>
                </li>
                <li className={styles['app-header__logo-wrapper']}>
                    <Logo />
                </li>
                <li className={cs(styles['app-header__menu-item'], 'p-5', 'text_color_inactive')}>
                    <ProfileIcon type={"secondary"}/>
                    <span className="ml-2">Личный кабинет</span>
                </li>
            </ul>
        </nav>
    </header>);
}

export default AppHeader;
