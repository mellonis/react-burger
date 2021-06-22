import React, { useReducer } from 'react';
import cs from 'classnames';
import {
  Button,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Amount from '../amount';

import style from './style.module.css';

import ingredients from '../../utils/data';

const idToIngredientMap = ingredients.reduce((result, ingredient) => {
  result.set(ingredient._id, ingredient);

  return result;
}, new Map());

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
    const { price } = idToIngredientMap.get(refId);

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

  void dispatch;

  return (
    <div className={cs(style['burger-constructor'], 'pt-25', className)}>
      <div className={style['burger-constructor__list']}>
        {list.map(({ id, isLocked, refId, type }, ix) => {
          const { image, name, price } = idToIngredientMap.get(refId);

          return (
            <React.Fragment key={id}>
              <div
                className={
                  style['burger-constructor__constructor-element-wrapper']
                }
              >
                {!isLocked ? (
                  <DragIcon type={'primary'} />
                ) : (
                  <div className={'pl-8'} />
                )}
                <div className={'pl-6'} />
                <ConstructorElement
                  handleClose={() => {
                    dispatch({ type: 'remove', id });
                  }}
                  isLocked={isLocked}
                  price={price}
                  text={name}
                  thumbnail={image}
                  type={type}
                />
              </div>
              {ix + 1 < list.length ? <div className={'pt-4'} /> : null}
            </React.Fragment>
          );
        })}
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
