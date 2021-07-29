import React from 'react';
import cs from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Html5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../burger-ingredients';
import { BurgerConstructor } from '../burger-constructor';
import styles from './style.module.css';
import { lexemes } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  resetDetailedIngredient,
  resetOrderDetails,
} from '../../services/reducers';
import { IngredientDetails } from '../ingredient-details';
import style from '../burger-constructor/style.module.css';
import { Modal } from '../modal';
import { OrderDetails } from '../order-details';

const AppBody = () => {
  const { detailedIngredient, orderDetails } = useAppSelector(
    (state) => state.main
  );
  const dispatch = useAppDispatch();

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
      {detailedIngredient && (
        <Modal
          onClose={() => dispatch(resetDetailedIngredient())}
          title={lexemes.ingredientDetails}
        >
          <IngredientDetails
            className={cs(style['burger-constructor__ingredient-details'])}
            ingredient={detailedIngredient}
          />
        </Modal>
      )}
      {orderDetails && (
        <Modal onClose={() => dispatch(resetOrderDetails())}>
          <OrderDetails
            className={cs(
              style['burger-constructor__order-details'],
              'mt-4 mb-20'
            )}
            orderDetails={orderDetails}
          />
        </Modal>
      )}
    </main>
  );
};

export { AppBody };
