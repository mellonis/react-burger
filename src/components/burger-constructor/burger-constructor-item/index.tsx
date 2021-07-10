import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { DragPreviewImage, useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  ActualIngredientDragItem,
  ActualIngredientType,
  DraggableTypes,
  Ingredient_t,
} from '../../../types';
import { lexemes } from '../../../consts';
import { useAppDispatch } from '../../../services/store';
import { moveIngredient } from '../../../services/reducers';

import style from './style.module.css';

const BurgerConstructorItem = ({
  className,
  index,
  ingredient: { _id, image, name, price },
  isLocked,
  onShowIngredientInfo,
  onDelete,
  type,
}: {
  className?: string;
  index?: number;
  ingredient: Ingredient_t;
  isLocked: boolean;
  onShowIngredientInfo?: () => void;
  onDelete?: () => void;
  type?: ActualIngredientType;
}) => {
  const dispatch = useAppDispatch();
  const [{ isItPicked }, dragRef, preview] = useDrag({
    type: DraggableTypes.actualIngredient,
    canDrag: !isLocked,
    item: {
      index,
    } as ActualIngredientDragItem,
    collect(monitor) {
      return {
        isItPicked: monitor.isDragging(),
      };
    },
  });
  const [{ isCanDrop, isDragOver }, dropRef] = useDrop({
    accept: DraggableTypes.actualIngredient,
    canDrop(item) {
      const { index: draggableIndex } = item as ActualIngredientDragItem;

      return !isLocked && index !== draggableIndex;
    },
    collect(monitor) {
      return {
        isCanDrop: monitor.canDrop(),
        isDragOver: monitor.isOver(),
      };
    },
    hover(item) {
      const { index: draggableIndex } = item as ActualIngredientDragItem;

      if (index === draggableIndex) {
        return;
      }

      if (index != null) {
        //mutate the item in order to prevent multiple dispatches
        (item as ActualIngredientDragItem).index = index;
        dispatch(moveIngredient([draggableIndex, index]));
      }
    },
  });

  return (
    <div
      ref={dropRef}
      className={cs(
        style['burger-constructor-item'],
        {
          [style['burger-constructor-item_interactive']]: onShowIngredientInfo,
          [style['burger-constructor-item_is-picked']]: isItPicked,
          [style['burger-constructor-item_is-can-drop']]: isCanDrop,
          [style['burger-constructor-item_is-drag-over']]: isDragOver,
          'pt-4': !isLocked,
        },
        className
      )}
      onClick={(event) => {
        const target = event.target as HTMLElement;

        if (
          onShowIngredientInfo &&
          target.closest(
            `.${style['burger-constructor-item__constructor-element-wrapper']}`
          ) &&
          !target.closest('.constructor-element__action')
        ) {
          onShowIngredientInfo();
        }
      }}
    >
      {!isLocked ? (
        <div ref={dragRef}>
          <DragIcon type={'primary'} />
        </div>
      ) : (
        <div className={'pl-8'} />
      )}
      <DragPreviewImage connect={preview} src={image} />
      <div className={'pl-6'} />
      <div
        className={
          style['burger-constructor-item__constructor-element-wrapper']
        }
      >
        <ConstructorElement
          handleClose={onDelete}
          isLocked={isLocked}
          price={price}
          text={`${name}${
            type
              ? ` (${
                  type === ActualIngredientType.top
                    ? lexemes.top
                    : lexemes.bottom
                })`
              : ''
          }`}
          thumbnail={image}
          type={type}
        />
      </div>
    </div>
  );
};

BurgerConstructorItem.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  index: PropTypes.number,
  ingredient: PropTypes.object.isRequired,
  isLocked: PropTypes.bool.isRequired,
  onShowIngredientInfo: PropTypes.func,
  onDelete: PropTypes.func,
  type: PropTypes.oneOf([
    ActualIngredientType.top,
    ActualIngredientType.bottom,
  ]),
};

export default BurgerConstructorItem;
