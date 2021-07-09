import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { useDrop } from 'react-dnd';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  DraggableTypes,
  IngredientDragItem,
  IngredientType,
} from '../../types';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { lexemes } from '../../consts';
import {
  addIngredient,
  placeAnOrder,
  removeIngredient,
  setDetailedIngredient,
} from '../../services/reducers';
import Amount from '../amount';
import BurgerConstructorItem from './burger-constructor-item';

import style from './style.module.css';

const BurgerConstructor = ({ className }: { className?: string }) => {
  const {
    actualIngredients,
    idToIngredientMap,
    orderDetailsRequest,
    totalAmount,
  } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  const topBun = actualIngredients.slice(0, 1)[0];
  const bottomBun = actualIngredients.slice(-1)[0];
  const placeAnOrderClickHandler = useCallback(() => {
    if (!orderDetailsRequest) {
      dispatch(placeAnOrder(actualIngredients.map(({ refId }) => refId)));
    }
  }, [actualIngredients, dispatch, orderDetailsRequest]);

  const [{ isCanDrop, isDragOver }, dropRef] = useDrop({
    accept: DraggableTypes.ingredient,
    canDrop(item, monitor) {
      return !(
        actualIngredients.length === 0 &&
        monitor.getItemType() === DraggableTypes.ingredient &&
        (item as IngredientDragItem).type !== IngredientType.bun
      );
    },
    drop(item) {
      const { refId } = item as IngredientDragItem;

      dispatch(addIngredient(idToIngredientMap[refId]));
    },
    collect(monitor) {
      return {
        isCanDrop: monitor.canDrop(),
        isDragOver: monitor.isOver(),
      };
    },
  });

  return (
    <div
      className={cs(
        style['burger-constructor'],
        'pt-25 pb-5',
        {
          [style['burger-constructor_is-empty']]:
            actualIngredients.length === 0,
          [style['burger-constructor_is-can-drop']]: isCanDrop,
          [style['burger-constructor_is-drag-over']]: isDragOver,
        },
        className
      )}
    >
      <div ref={dropRef} className={style['burger-constructor__list']}>
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
            .map(({ id, isLocked = false, refId, type }, ix) => {
              const ingredient = idToIngredientMap[refId];

              return (
                ingredient && (
                  <BurgerConstructorItem
                    key={id}
                    id={id}
                    index={ix + 1}
                    ingredient={idToIngredientMap[refId]!}
                    isLocked={isLocked}
                    onShowIngredientInfo={() => {
                      dispatch(setDetailedIngredient(ingredient));
                    }}
                    onDelete={() => {
                      dispatch(removeIngredient(id));
                    }}
                    type={type}
                  />
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
    </div>
  );
};

BurgerConstructor.propTypes = { className: PropTypes.string };

export default BurgerConstructor;
