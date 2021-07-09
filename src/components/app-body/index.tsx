import React from 'react';
import cs from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Html5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../burger-ingredients';
import BurgerConstructor from '../burger-constructor';
import styles from './style.module.css';

const AppBody = () => {
  return (
    <main
      className={cs(
        styles['app-body'],
        'pl-5 pr-5 text text_type_main-default'
      )}
    >
      <DndProvider backend={Html5Backend}>
        <BurgerIngredients className={styles['app-body__ingredients']} />
        <div className={cs(styles['app-body__space'], 'pl-10')} />
        <BurgerConstructor className={styles['app-body__constructor']} />
      </DndProvider>
    </main>
  );
};

export default AppBody;
