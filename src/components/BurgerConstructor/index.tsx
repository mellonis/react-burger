import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient_t, OrderDetails_t, OrderStatus_t } from '../../types';
import { lexemes } from '../../consts';
import { useIngredientsContextValue } from '../../contexts/IngredientContext';
import Amount from '../Amount';
import BurgerConstructorItem from './BurgerConstructorElement';
import IngredientDetails from '../IngredientDetails';
import Modal from '../Modal';
import OrderDetails from '../OrderDetails';

import style from './style.module.css';

type ActualIngredient_t = {
  id: string;
  refId: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom';
};

type State = {
  ingredientsMap: Map<string, Ingredient_t>;
  isOrderDetailsShown: boolean;
  list: ActualIngredient_t[];
  orderDetails: OrderDetails_t | null;
  total: number;
};
type Action =
  | { type: 'actualize-ingredients-map'; map: Map<string, Ingredient_t> }
  | { type: 'actualize-ingredients'; ingredients: Ingredient_t[] }
  | { type: 'actualize-order-details'; orderDetails: OrderDetails_t | null }
  | { type: 'hide-order-details' }
  | { type: 'remove-ingredient'; id: string }
  | { type: 'show-order-details' };

const actualIngredientIds: ActualIngredient_t[] = [];

const calcTotal = (
  idToIngredientMap: Map<string, Ingredient_t>,
  ingredientIds: ActualIngredient_t[]
) =>
  ingredientIds.reduce((result, { refId }) => {
    const { price } = idToIngredientMap.get(refId)!;

    return result + price;
  }, 0);

const init = (actualIngredientIds: ActualIngredient_t[]): State => {
  return {
    ingredientsMap: new Map(),
    isOrderDetailsShown: false,
    list: actualIngredientIds,
    orderDetails: {
      id: '034536',
      message: 'Дождитесь готовности на орбитальной станции',
      status: OrderStatus_t.BEING_COOKED,
    },
    total: 0,
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'actualize-ingredients':
      const timestamp = new Date().getTime();
      const { ingredients } = action;

      return {
        ...state,
        list: ingredients.map(({ _id }, ix, list) => {
          const isItTop = ix === 0;
          const isItBottom = ix === list.length - 1;
          const result = {
            id: `${timestamp}:${ix}`,
            refId: _id,
            isLocked: isItTop || isItBottom,
            type: isItTop
              ? 'top'
              : isItBottom
              ? 'bottom'
              : (undefined as 'top' | 'bottom' | undefined),
          };

          if (isItTop || isItBottom) {
            result.isLocked = true;
          }

          if (isItTop) {
            result.type = 'top';
          }

          if (isItBottom) {
            result.type = 'bottom';
          }

          return result;
        }),
      };
    case 'actualize-ingredients-map': {
      const { map } = action;

      return {
        ...state,
        ingredientsMap: map,
        total: calcTotal(map, state.list),
      };
    }
    case 'actualize-order-details': {
      const { orderDetails } = action;

      return {
        ...state,
        isOrderDetailsShown: state.isOrderDetailsShown && !!orderDetails,
        orderDetails,
      };
    }
    case 'hide-order-details':
      return {
        ...state,
        isOrderDetailsShown: false,
      };
    case 'remove-ingredient': {
      const filteredList = state.list.filter(({ id }) => id !== action.id);

      return {
        ...state,
        list: filteredList,
        total: calcTotal(state.ingredientsMap, filteredList),
      };
    }
    case 'show-order-details':
      if (state.orderDetails) {
        return {
          ...state,
          isOrderDetailsShown: true,
        };
      }

      return state;
  }
};

const BurgerConstructor = ({ className }: { className?: string }) => {
  const { ingredients, idToIngredientMap } = useIngredientsContextValue();
  const [
    { isOrderDetailsShown, list, orderDetails, total },
    dispatch,
  ] = useReducer(reducer, actualIngredientIds, init);
  const [detailedIngredient, setDetailedIngredient] = useState(
    null as Ingredient_t | null
  );

  useEffect(() => {
    dispatch({ type: 'actualize-ingredients', ingredients });
    dispatch({ type: 'actualize-ingredients-map', map: idToIngredientMap });
  }, [idToIngredientMap, ingredients]);

  const top = list[0];
  const bottom = list[list.length - 1];

  if (idToIngredientMap.size === 0) {
    return null;
  }

  return (
    <div className={cs(style['burger-constructor'], 'pt-25 pb-5', className)}>
      <div className={style['burger-constructor__list']}>
        {top && (
          <>
            {(() => {
              const { isLocked = false, refId, type } = top;
              const ingredient = idToIngredientMap.get(refId);

              return (
                ingredient && (
                  <BurgerConstructorItem
                    ingredient={idToIngredientMap.get(refId)!}
                    isLocked={isLocked}
                    onClick={() => setDetailedIngredient(ingredient)}
                    type={type}
                  />
                )
              );
            })()}
            <div className={'pt-4'} />
          </>
        )}
        <div className={style['burger-constructor__filling']}>
          {list
            .slice(1, -1)
            .map(({ id, isLocked = false, refId, type }, ix, list) => {
              const ingredient = idToIngredientMap.get(refId);

              return (
                ingredient && (
                  <React.Fragment key={id}>
                    <BurgerConstructorItem
                      ingredient={idToIngredientMap.get(refId)!}
                      isLocked={isLocked}
                      onClick={() => setDetailedIngredient(ingredient)}
                      onDelete={() => {
                        dispatch({ type: 'remove-ingredient', id });
                      }}
                      type={type}
                    />
                    {ix + 1 < list.length ? <div className={'pt-4'} /> : null}
                  </React.Fragment>
                )
              );
            })}
        </div>
        {bottom && (
          <>
            <div className={'pt-4'} />
            {(() => {
              const { isLocked = false, refId, type } = bottom;
              const ingredient = idToIngredientMap.get(refId);

              return (
                ingredient && (
                  <BurgerConstructorItem
                    ingredient={idToIngredientMap.get(refId)!}
                    isLocked={isLocked}
                    onClick={() => setDetailedIngredient(ingredient)}
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
          amount={total}
          className={style['burger-constructor__total']}
          isTotal={true}
        />
        <div className={'pl-10'} />
        <Button
          onClick={() => dispatch({ type: 'show-order-details' })}
          size={'large'}
          type={'primary'}
        >
          {lexemes.placeAnOrder}
        </Button>
      </div>
      {isOrderDetailsShown && orderDetails && (
        <Modal onClose={() => dispatch({ type: 'hide-order-details' })}>
          <OrderDetails
            className={cs(
              style['burger-constructor__order-details'],
              'mt-4 mb-20'
            )}
            orderDetails={orderDetails}
          />
        </Modal>
      )}
      {detailedIngredient && (
        <Modal
          onClose={() => setDetailedIngredient(null)}
          title={lexemes.ingredientDetails}
        >
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
