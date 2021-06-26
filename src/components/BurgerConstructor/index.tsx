import React, { useReducer } from 'react';
import cs from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredients from '../../utils/data';
import Amount from '../Amount';
import BurgerConstructorItem from './BurgerConstructorElement';
import { Ingredient_t } from './types';

import style from './style.module.css';

const idToIngredientMap: Map<string, Ingredient_t> = ingredients.reduce(
  (result, ingredient) => {
    result.set(ingredient._id, ingredient);

    return result;
  },
  new Map()
);

type ActualIngredient_t = {
  id: number;
  refId: string;
  isLocked?: boolean;
  type?: 'top' | 'bottom';
};

type State = {
  list: ActualIngredient_t[];
  total: number;
};
type Action = { type: 'remove'; id: number };

const actualIngredientIds: ActualIngredient_t[] = [
  {
    id: 1,
    refId: '60666c42cc7b410027a1a9b1',
    isLocked: true,
    type: 'top',
  },
  {
    id: 2,
    refId: '60666c42cc7b410027a1a9b9',
  },
  {
    id: 3,
    refId: '60666c42cc7b410027a1a9b4',
  },
  {
    id: 4,
    refId: '60666c42cc7b410027a1a9bc',
  },
  {
    id: 5,
    refId: '60666c42cc7b410027a1a9bb',
  },
  {
    id: 6,
    refId: '60666c42cc7b410027a1a9bb',
  },
  {
    id: 7,
    refId: '60666c42cc7b410027a1a9b1',
    isLocked: true,
    type: 'bottom',
  },
];

const calcTotal = (ingredientIds: ActualIngredient_t[]) => {
  return ingredientIds.reduce((result, { refId }) => {
    const { price } = idToIngredientMap.get(refId)!;

    return result + price;
  }, 0);
};

const init = (actualIngredientIds: ActualIngredient_t[]): State => {
  return {
    list: actualIngredientIds,
    total: calcTotal(actualIngredientIds),
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'remove': {
      const filteredList = state.list.filter(({ id }) => id !== action.id);

      return {
        ...state,
        list: filteredList,
        total: calcTotal(filteredList),
      };
    }
  }
};

const BurgerConstructor = ({ className }: { className?: string }) => {
  const [{ list, total }, dispatch] = useReducer(
    reducer,
    actualIngredientIds,
    init
  );

  const top = list[0];
  const bottom = list[list.length - 1];

  console.log({ top, bottom });

  return (
    <div className={cs(style['burger-constructor'], 'pt-25', className)}>
      <div className={style['burger-constructor__list']}>
        {(() => {
          const { id, isLocked = false, refId, type } = top;

          return (
            <BurgerConstructorItem
              ingredient={idToIngredientMap.get(refId)!}
              isLocked={isLocked}
              onDelete={() => {
                dispatch({ type: 'remove', id });
              }}
              type={type}
            />
          );
        })()}
        <div className={'pt-4'} />
        <div className={style['burger-constructor__filling']}>
          {list
            .slice(1, -1)
            .map(({ id, isLocked = false, refId, type }, ix, list) => (
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
            ))}
        </div>
        <div className={'pt-4'} />
        {(() => {
          const { id, isLocked = false, refId, type } = bottom;

          return (
            <BurgerConstructorItem
              ingredient={idToIngredientMap.get(refId)!}
              isLocked={isLocked}
              onDelete={() => {
                dispatch({ type: 'remove', id });
              }}
              type={type}
            />
          );
        })()}
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
