import React from 'react'
import cs from 'classnames';
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import styles from './style.module.css'

const AppBody = () => {
    return (<div className={cs(styles['app-body'], 'pl-5 pr-5')}>
        <BurgerIngredients/>
        <div className={cs(styles['app-body__space'], 'pl-10')}/>
        <BurgerConstructor/>
    </div>);
}

export default AppBody;
