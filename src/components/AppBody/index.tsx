import React from 'react';
import cs from 'classnames';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';
import styles from './style.module.css';

const AppBody = () => {
  return (
    <main
      className={cs(
        styles['app-body'],
        'pl-5 pr-5 text text_type_main-default'
      )}
    >
      <BurgerIngredients className={styles['app-body__ingredients']} />
      <div className={cs(styles['app-body__space'], 'pl-10')} />
      <BurgerConstructor className={styles['app-body__constructor']} />
    </main>
  );
};

export default AppBody;
