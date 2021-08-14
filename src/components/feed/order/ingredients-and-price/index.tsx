import cs from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useAppSelector } from '../../../../services/store';
import { IngredientType, Order } from '../../../../types';
import { Amount } from '../../../amount';
import ingredientsAndPriceStyles from './style.module.css';

const ingredientsAndPriceClassname = 'ingredients-and-price';
const ingredientsToRenderLimit = 6;

const IngredientsAndPrice = ({ order }: { order: Order }) => {
  const idToIngredientMap = useAppSelector(
    (state) => state.burger.idToIngredientMap
  );
  const { ingredientsToRender, moreIngredientsCount, price } = useMemo(() => {
    const ingredients = order.ingredients.map(
      (ingredientId) => idToIngredientMap[ingredientId]
    );
    const bun = ingredients.find(({ type }) => type === IngredientType.bun);
    const bunPrice = bun?.price ?? 0;
    const ingredientsWithoutABun = ingredients.filter(
      ({ type }) => type !== IngredientType.bun
    );
    const ingredientsToRender = bun
      ? [bun, ...ingredientsWithoutABun]
      : ingredientsWithoutABun;
    const price =
      bunPrice * 2 +
      ingredientsWithoutABun.reduce((result, { price }) => result + price, 0);

    return {
      ingredientsToRender: ingredientsToRender.slice(
        0,
        ingredientsToRenderLimit
      ),
      moreIngredientsCount:
        ingredientsToRender.length - ingredientsToRenderLimit,
      price,
    };
  }, [idToIngredientMap, order]);

  return (
    <div className={ingredientsAndPriceStyles[ingredientsAndPriceClassname]}>
      <ul
        className={
          ingredientsAndPriceStyles[
            `${ingredientsAndPriceClassname}__ingredients`
          ]
        }
      >
        {ingredientsToRender.map((ingredient, ix) => (
          <li
            key={ix}
            className={
              ingredientsAndPriceStyles[
                `${ingredientsAndPriceClassname}__ingredient`
              ]
            }
          >
            <img alt={ingredient.name} src={ingredient.image} />
            {moreIngredientsCount > 0 && ix + 1 === ingredientsToRenderLimit ? (
              <div
                className={cs(
                  ingredientsAndPriceStyles[
                    `${ingredientsAndPriceClassname}__more-ingredients-count`
                  ],
                  'text text_type_digits-default text_type_main-medium'
                )}
              >
                +{moreIngredientsCount}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      <div className={'pl-6'} />
      <div
        className={
          ingredientsAndPriceStyles[`${ingredientsAndPriceClassname}__price`]
        }
      >
        <Amount amount={price} />
      </div>
    </div>
  );
};

IngredientsAndPrice.propTypes = {
  order: PropTypes.object.isRequired,
};

export { IngredientsAndPrice };
