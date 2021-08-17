import cs from 'classnames';
import React, { FC } from 'react';
import { Ingredient_t } from '../../types';
import ingredientIconStyles from './style.module.css';

export enum IngredientIconRenderType {
  div = 'div',
  li = 'li',
}

const ingredientIconClassname = 'ingredient-icon';

const IngredientIcon: FC<{
  className?: string;
  ingredient: Ingredient_t;
  moreIngredientsCount?: number;
  tag?: IngredientIconRenderType;
}> = ({ className, ingredient, moreIngredientsCount, tag }) => {
  const Tag = tag!;

  return (
    <Tag
      className={cs(ingredientIconStyles[ingredientIconClassname], className)}
    >
      <img
        alt={ingredient.name}
        className={ingredientIconStyles[`${ingredientIconClassname}__image`]}
        src={ingredient.image}
      />
      {moreIngredientsCount ? (
        <div
          className={cs(
            ingredientIconStyles[
              `${ingredientIconClassname}__more-ingredients-count`
            ],
            'text text_type_digits-default text_type_main-medium'
          )}
        >
          +{moreIngredientsCount}
        </div>
      ) : null}
    </Tag>
  );
};

IngredientIcon.defaultProps = {
  tag: IngredientIconRenderType.div,
};

export { IngredientIcon };
