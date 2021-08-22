import cs from 'classnames';
import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Html5Backend } from 'react-dnd-html5-backend';
import { BurgerConstructor } from '../../components/burger-constructor';
import burgerConstructorStyles from '../../components/burger-constructor/style.module.css';
import { BurgerIngredients } from '../../components/burger-ingredients';
import { Modal } from '../../components/modal';
import { PlacedOrderDetails } from '../../components/placed-order-details';
import { resetOrderDetails } from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../services/store';

import pageStyles from '../page-style.module.css';
import mainPageStyles from './style.module.css';

const mainPageClassname = 'main-page';

const MainPage: FC = () => {
  const { orderDetails } = useAppSelector((state) => state.burger);
  const dispatch = useAppDispatch();

  return (
    <div
      className={cs(
        pageStyles['page'],
        pageStyles[`page_${mainPageClassname}`], // for BEM methodology accomplishments
        mainPageStyles[mainPageClassname]
      )}
    >
      <DndProvider backend={Html5Backend}>
        <BurgerIngredients
          className={mainPageStyles[`${mainPageClassname}__ingredients`]}
        />
        <div
          className={cs(mainPageStyles[`${mainPageClassname}__space`], 'pl-10')}
        />
        <BurgerConstructor
          className={mainPageStyles[`${mainPageClassname}__constructor`]}
        />
      </DndProvider>
      {orderDetails && (
        <Modal onClose={() => dispatch(resetOrderDetails())}>
          <PlacedOrderDetails
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
