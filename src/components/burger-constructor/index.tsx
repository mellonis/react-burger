import React, { useCallback, useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient_t } from '../../types';
import { IngredientType, lexemes } from '../../consts';
import { useIngredientContext, useOrderContext } from '../../contexts';
import Amount from '../amount';
import BurgerConstructorItem from './burger-constructor-item';
import IngredientDetails from '../ingredient-details';
import Modal from '../modal';
import OrderDetails from '../order-details';

import style from './style.module.css';

type ActualIngredient_t = {
  id: string;
  refId: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom';
};

type State = {
  bottomBun?: ActualIngredient_t;
  idToIngredientMap: Map<string, Ingredient_t>;
  isOrderDetailsShown: boolean;
  list: ActualIngredient_t[];
  topBun?: ActualIngredient_t;
  total: number;
};
type Action =
  | { type: 'actualize-ingredients-map'; map: Map<string, Ingredient_t> }
  | { type: 'add-ingredient'; ingredient: Ingredient_t }
  | { type: 'hide-order-details' }
  | { type: 'remove-ingredient'; id: string }
  | { type: 'show-order-details' };

const generateIngredientId = () => uuidv4();

const actualIngredientIds: ActualIngredient_t[] = [];

const calcTotal = ({
  bottomBun,
  idToIngredientMap,
  list,
  topBun,
}: {
  bottomBun?: ActualIngredient_t;
  idToIngredientMap: Map<string, Ingredient_t>;
  list: ActualIngredient_t[];
  topBun?: ActualIngredient_t;
}) => {
  const ingredientIds = list.map(({ refId }) => refId);

  if (topBun) {
    ingredientIds.unshift(topBun.refId);
  }

  if (bottomBun) {
    ingredientIds.push(bottomBun.refId);
  }

  return ingredientIds.reduce((result, refId) => {
    const { price } = idToIngredientMap.get(refId)!;

    return result + price;
  }, 0);
};

const init = (actualIngredientIds: ActualIngredient_t[]): State => {
  return {
    idToIngredientMap: new Map(),
    isOrderDetailsShown: false,
    list: actualIngredientIds,
    total: 0,
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'actualize-ingredients-map': {
      const { map } = action;

      return {
        ...state,
        idToIngredientMap: map,
        total: calcTotal({
          bottomBun: state.bottomBun,
          idToIngredientMap: state.idToIngredientMap,
          list: state.list,
          topBun: state.topBun,
        }),
      };
    }
    case 'add-ingredient': {
      const { _id, type } = action.ingredient;

      if (type === IngredientType.bun) {
        const bottomBun: ActualIngredient_t = {
          id: generateIngredientId(),
          isLocked: true,
          type: 'bottom',
          refId: _id,
        };
        const topBun: ActualIngredient_t = {
          id: generateIngredientId(),
          isLocked: true,
          type: 'top',
          refId: _id,
        };

        return {
          ...state,
          bottomBun,
          topBun,
          total: calcTotal({
            bottomBun,
            idToIngredientMap: state.idToIngredientMap,
            list: state.list,
            topBun,
          }),
        };
      }

      const list = [
        ...state.list,
        {
          id: generateIngredientId(),
          refId: _id,
        },
      ];

      return {
        ...state,
        list,
        total: calcTotal({
          bottomBun: state.bottomBun,
          idToIngredientMap: state.idToIngredientMap,
          list,
          topBun: state.topBun,
        }),
      };
    }
    case 'hide-order-details':
      return {
        ...state,
        isOrderDetailsShown: false,
      };
    case 'remove-ingredient': {
      const list = state.list.filter(({ id }) => id !== action.id);

      return {
        ...state,
        list,
        total: calcTotal({
          bottomBun: state.bottomBun,
          idToIngredientMap: state.idToIngredientMap,
          list,
          topBun: state.topBun,
        }),
      };
    }
    case 'show-order-details':
      return {
        ...state,
        isOrderDetailsShown: true,
      };
  }
};

const BurgerConstructor = ({ className }: { className?: string }) => {
  const { ingredients, idToIngredientMap } = useIngredientContext();
  const { orderDetails, placeAnOrder } = useOrderContext();
  const [
    { bottomBun, isOrderDetailsShown, list, topBun, total },
    dispatch,
  ] = useReducer(reducer, actualIngredientIds, init);
  const [detailedIngredient, setDetailedIngredient] = useState(
    null as Ingredient_t | null
  );

  useEffect(() => {
    if (ingredients && idToIngredientMap) {
      dispatch({ type: 'actualize-ingredients-map', map: idToIngredientMap });

      ingredients.forEach((ingredient) => {
        dispatch({ type: 'add-ingredient', ingredient });
      });
    }
  }, [idToIngredientMap, ingredients]);

  const placeAnOrderClickHandler = useCallback(() => {
    const orderIngredientsList = [...list];

    if (topBun) {
      orderIngredientsList.unshift(topBun);
    }

    if (bottomBun) {
      orderIngredientsList.push(bottomBun);
    }

    placeAnOrder(orderIngredientsList.map(({ refId }) => refId))
      .then(() => dispatch({ type: 'show-order-details' }))
      .catch(console.error);
  }, [list, topBun, bottomBun, placeAnOrder]);

  if (idToIngredientMap.size === 0) {
    return null;
  }

  return (
    <div className={cs(style['burger-constructor'], 'pt-25 pb-5', className)}>
      <div className={style['burger-constructor__list']}>
        {topBun && (
          <>
            {(() => {
              const { isLocked = false, refId, type } = topBun;
              const ingredient = idToIngredientMap.get(refId);

              return (
                ingredient && (
                  <BurgerConstructorItem
                    ingredient={idToIngredientMap.get(refId)!}
                    isLocked={isLocked}
                    onShowIngredientInfo={() =>
                      setDetailedIngredient(ingredient)
                    }
                    type={type}
                  />
                )
              );
            })()}
            <div className={'pt-4'} />
          </>
        )}
        <div className={style['burger-constructor__filling']}>
          {list.map(({ id, isLocked = false, refId, type }, ix, list) => {
            const ingredient = idToIngredientMap.get(refId);

            return (
              ingredient && (
                <React.Fragment key={id}>
                  <BurgerConstructorItem
                    ingredient={idToIngredientMap.get(refId)!}
                    isLocked={isLocked}
                    onShowIngredientInfo={() =>
                      setDetailedIngredient(ingredient)
                    }
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
        {bottomBun && (
          <>
            <div className={'pt-4'} />
            {(() => {
              const { isLocked = false, refId, type } = bottomBun;
              const ingredient = idToIngredientMap.get(refId);

              return (
                ingredient && (
                  <BurgerConstructorItem
                    ingredient={idToIngredientMap.get(refId)!}
                    isLocked={isLocked}
                    onShowIngredientInfo={() =>
                      setDetailedIngredient(ingredient)
                    }
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
          onClick={placeAnOrderClickHandler}
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
