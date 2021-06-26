import React from 'react';
import cs from 'classnames';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient_t } from '../../../types';

import style from './style.module.css';

const BurgerConstructorItem = ({
  className,
  ingredient: { image, name, price },
  isLocked,
  onClick,
  onDelete,
  type,
}: {
  className?: string;
  ingredient: Ingredient_t;
  isLocked: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  type?: 'top' | 'bottom';
}) => {
  return (
    <div
      className={cs(
        style['burger-constructor-item'],
        {
          [style['burger-constructor-item_interactive']]: onClick,
        },
        className
      )}
      onClick={onClick}
    >
      {!isLocked ? <DragIcon type={'primary'} /> : <div className={'pl-8'} />}
      <div className={'pl-6'} />
      <ConstructorElement
        handleClose={onDelete}
        isLocked={isLocked}
        price={price}
        text={name}
        thumbnail={image}
        type={type}
      />
    </div>
  );
};

export default BurgerConstructorItem;
