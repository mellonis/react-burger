import cs from 'classnames';
import React, { FC } from 'react';
import { Ingredient_t } from '../../../types';
import { Amount } from '../../amount';
import { IngredientIcon } from '../../ingredient-icon';
import ingredientAndPriceStyles from './style.module.css';

const ingredientAndPriceClassname = 'ingredient-and-price';

const IngredientAndPrice: FC<{
  ingredient: Ingredient_t;
  quantity: number;
}> = ({ ingredient, quantity }) => (
  <li
    className={cs(
      ingredientAndPriceStyles[ingredientAndPriceClassname],
      'mr-6'
    )}
  >
    <IngredientIcon ingredient={ingredient} />
    <div className={'pl-4'} />
    <div>{ingredient.name}</div>
    <div className={'pl-4'} />
    <div
      className={
        ingredientAndPriceStyles[
          `${ingredientAndPriceClassname}__quantity-and-price-wrapper`
        ]
      }
    >
      <div
        className={
          ingredientAndPriceStyles[`${ingredientAndPriceClassname}__quantity`]
        }
      >
        {quantity} x{' '}
      </div>
      <Amount amount={ingredient.price * quantity} />
    </div>
  </li>
);

export { IngredientAndPrice };
