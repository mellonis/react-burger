import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { useDrop } from 'react-dnd';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  ActualIngredientDragItem,
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
  resetDetailedIngredient,
  setDetailedIngredient,
} from '../../services/reducers';
import Amount from '../amount';
import BurgerConstructorItem from './burger-constructor-item';
import IngredientDetails from '../ingredient-details';
import Modal from '../modal';
import OrderDetails from '../order-details';

import style from './style.module.css';

const BurgerConstructor = ({ className }: { className?: string }) => {
  const {
    actualIngredients,
    detailedIngredient,
    ingredients,
    idToIngredientMap,
    orderDetails,
    orderDetailsRequest,
    totalAmount,
  } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();
  const [isIngredientDetailsShown, setIsIngredientDetailsShown] = useState(
    false
  );
  const [isOrderDetailsShown, setIsOrderDetailsShown] = useState(false);
  const onCloseHandler = useCallback(() => {
    dispatch(resetDetailedIngredient());
    setIsIngredientDetailsShown(false);
  }, [dispatch]);

  const topBun = actualIngredients.slice(0, 1)[0];
  const bottomBun = actualIngredients.slice(-1)[0];
  const placeAnOrderClickHandler = useCallback(() => {
    if (!orderDetailsRequest) {
      setIsOrderDetailsShown(true);
      dispatch(placeAnOrder(actualIngredients.map(({ refId }) => refId)));
    }
  }, [actualIngredients, dispatch, orderDetailsRequest]);

  const [{ isIngredientDragOver, isIngredientCanDrop }, dropRef] = useDrop({
    accept: [DraggableTypes.ingredient, DraggableTypes.actualIngredient],
    canDrop(item, monitor) {
      return !(
        actualIngredients.length === 0 &&
        monitor.getItemType() === DraggableTypes.ingredient &&
        (item as IngredientDragItem).type !== IngredientType.bun
      );
    },
    drop(item, monitor) {
      switch (monitor.getItemType()) {
        case DraggableTypes.ingredient: {
          const { refId } = item as IngredientDragItem;

          dispatch(addIngredient(idToIngredientMap[refId]));
          break;
        }
        case DraggableTypes.actualIngredient: {
          const { id } = item as ActualIngredientDragItem;
          const refId = actualIngredients.find(
            ({ id: actualIngredientId }) => actualIngredientId === id
          )!.refId;

          dispatch(
            addIngredient(ingredients.find(({ _id }) => _id === refId)!)
          );
          dispatch(removeIngredient(id));
          break;
        }
      }
    },
    collect(monitor) {
      return {
        isIngredientDragOver:
          monitor.getItemType() === DraggableTypes.ingredient &&
          monitor.isOver(),
        isIngredientCanDrop:
          monitor.getItemType() === DraggableTypes.ingredient &&
          monitor.canDrop(),
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
          [style['burger-constructor_is-drag-over']]: isIngredientDragOver,
          [style['burger-constructor_is-can-drop']]: isIngredientCanDrop,
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
                      id={id}
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
