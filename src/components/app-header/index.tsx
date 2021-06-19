import React from 'react'
import cs from 'classnames';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './style.module.css'

const AppHeader = () => {
    return (<div className={cs(styles['app-header'], 'pt-4 pb-4')}>
        <div className={cs(styles['app-header__menu-item'], 'p-5')}>
            <BurgerIcon type={"primary"}/>
            <span className="ml-2">Конструктор</span>
        </div>
        <div className={cs(styles['app-header__menu-item'], 'p-5', 'text_color_inactive')}>
            <ListIcon type={"secondary"}/>
            <span className="ml-2">Лента заказов</span>
        </div>
        <div className={styles['app-header__logo-wrapper']}>
            <Logo />
        </div>
        <div className={cs(styles['app-header__menu-item'], 'p-5', 'text_color_inactive')}>
            <ProfileIcon type={"secondary"}/>
            <span className="ml-2">Личный кабинет</span>
        </div>
    </div>);
}

export default AppHeader;
