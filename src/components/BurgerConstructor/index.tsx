import React, { useEffect, useReducer } from 'react';
import cs from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient_t } from '../../types';
import { useIngredientsContextValue } from '../../contexts/IngredientContext';
import Amount from '../Amount';
import BurgerConstructorItem from './BurgerConstructorElement';

import style from './style.module.css';

type ActualIngredient_t = {
  id: string;
  refId: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom';
};

type State = {
  ingredientsMap: Map<string, Ingredient_t>;
  list: ActualIngredient_t[];
  total: number;
};
type Action =
  | { type: 'remove'; id: string }
  | { type: 'actualize-ingredients-map'; map: Map<string, Ingredient_t> }
  | { type: 'actualize-ingredients'; ingredients: Ingredient_t[] };

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
    list: actualIngredientIds,
    total: 0,
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'remove': {
      const filteredList = state.list.filter(({ id }) => id !== action.id);

      return {
        ...state,
        list: filteredList,
        total: calcTotal(state.ingredientsMap, filteredList),
      };
    }
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
  }
};

const BurgerConstructor = ({ className }: { className?: string }) => {
  const { ingredients, idToIngredientMap } = useIngredientsContextValue();
  const [{ list, total }, dispatch] = useReducer(
    reducer,
    actualIngredientIds,
    init
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
    <div className={cs(style['burger-constructor'], 'pt-25', className)}>
      <div className={style['burger-constructor__list']}>
        {top && (
          <>
            {(() => {
              const { id, isLocked = false, refId, type } = top;
              const ingredient = idToIngredientMap.get(refId);

              return (
                ingredient && (
                  <BurgerConstructorItem
                    ingredient={idToIngredientMap.get(refId)!}
                    isLocked={isLocked}
                    onDelete={() => {
                      dispatch({ type: 'remove', id });
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
                      onDelete={() => {
                        dispatch({ type: 'remove', id });
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
              const { id, isLocked = false, refId, type } = bottom;
              const ingredient = idToIngredientMap.get(refId);

              return (
                ingredient && (
                  <BurgerConstructorItem
                    ingredient={idToIngredientMap.get(refId)!}
                    isLocked={isLocked}
                    onDelete={() => {
                      dispatch({ type: 'remove', id });
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
          amount={total}
          className={style['burger-constructor__total']}
          isTotal={true}
        />
        <div className={'pl-10'} />
        <Button type={'primary'} size={'large'}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
