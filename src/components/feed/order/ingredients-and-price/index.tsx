import React from 'react';
import { lexemes } from '../../../../consts';
import { useOrderIngredients } from '../../../../hooks';
import { Order } from '../../../../types';
import { Amount } from '../../../amount';
import {
  IngredientIcon,
  IngredientIconRenderType,
} from '../../../ingredient-icon';
import ingredientsAndPriceStyles from './style.module.css';

const ingredientsAndPriceClassname = 'ingredients-and-price';
const ingredientsToRenderLimit = 6;

const IngredientsAndPrice = ({ order }: { order: Order }) => {
  const {
    ingredientQuantityPairs,
    isItValid,
    moreIngredientsCount,
    totalPrice,
  } = useOrderIngredients({
    limit: 6,
    order,
  });

  return (
    <div className={ingredientsAndPriceStyles[ingredientsAndPriceClassname]}>
      {isItValid ? (
        <>
          <ul
            className={
              ingredientsAndPriceStyles[
                `${ingredientsAndPriceClassname}__ingredients`
              ]
            }
          >
            {ingredientQuantityPairs.map(([ingredient], ix) => (
              <IngredientIcon
                key={ingredient._id}
                className={
                  ingredientsAndPriceStyles[
                    `${ingredientsAndPriceClassname}__ingredient`
                  ]
                }
                ingredient={ingredient}
                moreIngredientsCount={
                  moreIngredientsCount > 0 &&
                  ix + 1 === ingredientsToRenderLimit
                    ? moreIngredientsCount
                    : undefined
                }
                tag={IngredientIconRenderType.li}
              />
            ))}
          </ul>
          <div className={'pl-6'} />
          <div
            className={
              ingredientsAndPriceStyles[
                `${ingredientsAndPriceClassname}__price`
              ]
            }
          >
            <Amount amount={totalPrice} />
          </div>
        </>
      ) : (
        <div className={'text text_color_error'}>{lexemes.noInformation}</div>
      )}
    </div>
  );
};

export { IngredientsAndPrice };
