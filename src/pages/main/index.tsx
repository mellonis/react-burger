import cs from 'classnames';
import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Html5Backend } from 'react-dnd-html5-backend';
import { useRouteMatch } from 'react-router-dom';
import { BurgerConstructor } from '../../components/burger-constructor';
import burgerConstructorStyles from '../../components/burger-constructor/style.module.css';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { IngredientDetails } from '../../components/ingredient-details';
import { Modal } from '../../components/modal';
import { OrderDetails } from '../../components/order-details';
import { lexemes } from '../../consts';
import {
  resetDetailedIngredient,
  resetOrderDetails,
} from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';

import pageStyles from '../page-style.module.css';
import mainPageStyles from './style.module.css';

const mainPageClassName = 'main-page';

const MainPage = () => {
  const { path } = useRouteMatch();
  const { detailedIngredient, orderDetails } = useAppSelector(
    (state) => state.burger
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (detailedIngredient) {
      window.history.replaceState(
        null,
        '',
        `/ingredients/${detailedIngredient._id}`
      );
    } else {
      window.history.replaceState(null, '', path);
    }

    return () => {
      if (detailedIngredient) {
        dispatch(resetDetailedIngredient());
        window.history.replaceState(null, '', path);
      }
    };
  }, [detailedIngredient, dispatch, path]);

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
