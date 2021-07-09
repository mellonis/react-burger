import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { DragPreviewImage, useDrag } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  ActualIngredient_t,
  ActualIngredientDragItem,
  ActualIngredientType,
  DraggableTypes,
  Ingredient_t,
} from '../../../types';
import { lexemes } from '../../../consts';

import style from './style.module.css';

const BurgerConstructorItem = ({
  className,
  id,
  ingredient: { _id, image, name, price },
  isLocked,
  onShowIngredientInfo,
  onDelete,
  type,
}: {
  className?: string;
  id?: ActualIngredient_t['id'];
  ingredient: Ingredient_t;
  isLocked: boolean;
  onShowIngredientInfo?: () => void;
  onDelete?: () => void;
  type?: ActualIngredientType;
}) => {
  const [, dragRef, preview] = useDrag({
    type: DraggableTypes.actualIngredient,
    canDrag: !isLocked,
    item: {
      id,
    } as ActualIngredientDragItem,
    collect(monitor) {
      return {
        isItPicked: monitor.isDragging(),
      };
    },
  });

  return (
    <div
      className={cs(
        style['burger-constructor-item'],
        {
          [style['burger-constructor-item_interactive']]: onShowIngredientInfo,
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
