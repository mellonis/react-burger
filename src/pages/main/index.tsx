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

import pageStyles from '../page-style.module.css';
import mainPageStyles from './style.module.css';
import burgerConstructorStyles from '../../components/burger-constructor/style.module.css';

const mainPageClassName = 'main-page';

const MainPage = () => {
  const { detailedIngredient, orderDetails } = useAppSelector(
    (state) => state.main
  );
  const dispatch = useAppDispatch();

  return (
    <div
      className={cs(
        pageStyles['page'],
        pageStyles[`page_${mainPageClassName}`], // for BEM methodology accomplishments
        mainPageStyles[mainPageClassName]
      )}
    >
      <DndProvider backend={Html5Backend}>
        <BurgerIngredients
          className={mainPageStyles[`${mainPageClassName}__ingredients`]}
        />
        <div
          className={cs(mainPageStyles[`${mainPageClassName}__space`], 'pl-10')}
        />
        <BurgerConstructor
          className={mainPageStyles[`${mainPageClassName}__constructor`]}
        />
      </DndProvider>
      {detailedIngredient && (
        <Modal
          onClose={() => dispatch(resetDetailedIngredient())}
          title={lexemes.ingredientDetails}
        >
          <IngredientDetails
            className={cs(
              burgerConstructorStyles['burger-constructor__ingredient-details']
            )}
            ingredient={detailedIngredient}
          />
        </Modal>
      )}
      {orderDetails && (
        <Modal onClose={() => dispatch(resetOrderDetails())}>
          <OrderDetails
            className={cs(
              burgerConstructorStyles['burger-constructor__order-details'],
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
