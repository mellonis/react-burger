import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderStatus_t } from '../../types';
import { RootState } from '../../services/store';
import { apiHostUrl, lexemes } from '../../consts';
import {
  addIngredient,
  removeIngredient,
  resetDetailedIngredient,
  resetOrderDetails,
  setDetailedIngredient,
  setOrderDetails,
} from '../../services/reducers';
import Amount from '../amount';
import BurgerConstructorItem from './burger-constructor-item';
import IngredientDetails from '../ingredient-details';
import Modal from '../modal';
import OrderDetails from '../order-details';

import style from './style.module.css';

export const getNewOrderId = async (ingredients: string[]): Promise<number> => {
  const response = await fetch(`${apiHostUrl}/api/orders`, {
    body: JSON.stringify({ ingredients }),
    headers: new Headers([['Content-Type', 'application/json']]),
    method: 'POST',
  });
  const result = await response.json();

  if (result.success === true) {
    return result.order.number;
  } else {
    throw new Error("Can't get data from server");
  }
};

const BurgerConstructor = ({ className }: { className?: string }) => {
  const {
    actualIngredients,
    detailedIngredient,
    ingredients,
    idToIngredientMap,
    orderDetails,
    totalAmount,
  } = useSelector((state: RootState) => state.main);
  const dispatch = useDispatch();
  const [isIngredientDetailsShown, setIsIngredientDetailsShown] = useState(
    false
  );
  const [isOrderDetailsShown, setIsOrderDetailsShown] = useState(false);
  const onCloseHandler = useCallback(() => {
    dispatch(resetDetailedIngredient());
    setIsIngredientDetailsShown(false);
  }, [dispatch]);

  useEffect(() => {
    ingredients.forEach((ingredient) => {
      dispatch(addIngredient(ingredient));
    });
  }, [dispatch, ingredients]);

  const topBun = actualIngredients.slice(0, 1)[0];
  const bottomBun = actualIngredients.slice(-1)[0];

  const placeAnOrder = useCallback(
    async (ingredients) => {
      dispatch(resetOrderDetails());

      getNewOrderId(ingredients)
        .then((orderId) => {
          dispatch(
            setOrderDetails({
              id: orderId,
              message: 'Дождитесь готовности на орбитальной станции',
              status: OrderStatus_t.BEING_COOKED,
            })
          );
        })
        .catch(console.error);
    },
    [dispatch]
  );

  const placeAnOrderClickHandler = useCallback(() => {
    placeAnOrder(actualIngredients.map(({ refId }) => refId))
      .then(() => setIsOrderDetailsShown(true))
      .catch(console.error);
  }, [placeAnOrder, actualIngredients]);

  if (actualIngredients.length === 0) {
    return null;
  }

  return (
    <div className={cs(style['burger-constructor'], 'pt-25 pb-5', className)}>
      <div className={style['burger-constructor__list']}>
        {topBun && (
          <>
            {(() => {
              const { isLocked = false, refId, type } = topBun;
              const ingredient = idToIngredientMap[refId];

              return (
                ingredient && (
                  <BurgerConstructorItem
                    ingredient={idToIngredientMap[refId]!}
                    isLocked={isLocked}
                    onShowIngredientInfo={() => {
                      dispatch(setDetailedIngredient(ingredient));
                      setIsIngredientDetailsShown(true);
                    }}
                    type={type}
                  />
                )
              );
            })()}
            <div className={'pt-4'} />
          </>
        )}
        <div className={style['burger-constructor__filling']}>
          {actualIngredients
            .slice(1, -1)
            .map(({ id, isLocked = false, refId, type }, ix, list) => {
              const ingredient = idToIngredientMap[refId];

              return (
                ingredient && (
                  <React.Fragment key={id}>
                    <BurgerConstructorItem
                      ingredient={idToIngredientMap[refId]!}
                      isLocked={isLocked}
                      onShowIngredientInfo={() => {
                        dispatch(setDetailedIngredient(ingredient));
                        setIsIngredientDetailsShown(true);
                      }}
                      onDelete={() => {
                        dispatch(removeIngredient(id));
                      }}
                      type={type}
                    />
                    {ix + 1 < list.length ? <div className={'pt-4'} /> : null}
                  </React.Fragment>
                )
              );
            })}
        </div>
        {bottomBun && (
          <>
            <div className={'pt-4'} />
            {(() => {
              const { isLocked = false, refId, type } = bottomBun;
              const ingredient = idToIngredientMap[refId];

              return (
                ingredient && (
                  <BurgerConstructorItem
                    ingredient={idToIngredientMap[refId]!}
                    isLocked={isLocked}
                    onShowIngredientInfo={() => {
                      dispatch(setDetailedIngredient(ingredient));
                      setIsIngredientDetailsShown(true);
                    }}
                    type={type}
                  />
                )
              );
            })()}
          </>
        )}
      </div>
      <div className={cs(style['burger-constructor__total-wrapper'], 'pt-10')}>
        <Amount
          amount={totalAmount}
          className={style['burger-constructor__total']}
          isTotal={true}
        />
        <div className={'pl-10'} />
        <Button
          onClick={placeAnOrderClickHandler}
          size={'large'}
          type={'primary'}
        >
          {lexemes.placeAnOrder}
        </Button>
      </div>
      {isOrderDetailsShown && orderDetails && (
        <Modal onClose={() => setIsOrderDetailsShown(false)}>
          <OrderDetails
            className={cs(
              style['burger-constructor__order-details'],
              'mt-4 mb-20'
            )}
            orderDetails={orderDetails}
          />
        </Modal>
      )}
      {isIngredientDetailsShown && detailedIngredient && (
        <Modal onClose={onCloseHandler} title={lexemes.ingredientDetails}>
          <IngredientDetails
            className={cs(style['burger-constructor__ingredient-details'])}
            ingredient={detailedIngredient}
          />
        </Modal>
      )}
    </div>
  );
};

BurgerConstructor.propTypes = { className: PropTypes.string };

export default BurgerConstructor;
