import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ActualIngredientType, Ingredient_t } from '../../../types';
import { lexemes } from '../../../consts';

import style from './style.module.css';

const BurgerConstructorItem = ({
  className,
  ingredient: { image, name, price },
  isLocked,
  onShowIngredientInfo,
  onDelete,
  type,
}: {
  className?: string;
  ingredient: Ingredient_t;
  isLocked: boolean;
  onShowIngredientInfo?: () => void;
  onDelete?: () => void;
  type?: ActualIngredientType;
}) => {
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
      {!isLocked ? <DragIcon type={'primary'} /> : <div className={'pl-8'} />}
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
