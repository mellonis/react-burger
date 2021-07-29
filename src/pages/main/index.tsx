import React from 'react';
import cs from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Html5Backend } from 'react-dnd-html5-backend';
import { lexemes } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  resetDetailedIngredient,
  resetOrderDetails,
} from '../../services/reducers';
import { BurgerConstructor } from '../../components/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { IngredientDetails } from '../../components/ingredient-details';
import { Modal } from '../../components/modal';
import { OrderDetails } from '../../components/order-details';
import { pageClassname } from '../consts';

import style from '../../components/burger-constructor/style.module.css';
import styles from './style.module.css';

const mainPageClassName = 'main-page';

const MainPage = () => {
  const { detailedIngredient, orderDetails } = useAppSelector(
    (state) => state.main
  );
  const dispatch = useAppDispatch();

  return (
    <div
      className={cs(
        pageClassname,
        `${pageClassname}_${mainPageClassName}`,
        styles[mainPageClassName]
      )}
    >
      <DndProvider backend={Html5Backend}>
        <BurgerIngredients
          className={styles[`${mainPageClassName}__ingredients`]}
        />
        <div className={cs(styles[`${mainPageClassName}__space`], 'pl-10')} />
        <BurgerConstructor
          className={styles[`${mainPageClassName}__constructor`]}
        />
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
    </div>
  );
};

export { MainPage };
