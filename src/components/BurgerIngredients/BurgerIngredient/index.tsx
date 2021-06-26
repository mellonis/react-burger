import React from 'react';
import cs from 'classnames';
import { Ingredient_t } from '../../../types';
import Amount from '../../Amount';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './style.module.css';

const BurgerIngredient = ({
  data: { image, name, price },
}: {
  data: Ingredient_t;
}) => {
  return (
    <li className={style['burger-ingredient']}>
      <Counter count={1} />
      <div
        className={cs(style['burger-ingredient__image-wrapper'], 'pl-4 pr-4')}
      >
        <img
          alt={name}
          className={style['burger-ingredient__image']}
          src={image}
        />
      </div>
      <Amount
        amount={price}
        className={cs(style['burger-ingredient__price-wrapper'], 'pt-1 pb-1')}
      />
      <div className={cs(style['burger-ingredient__title'])}>{name}</div>
    </li>
  );
};

export default BurgerIngredient;