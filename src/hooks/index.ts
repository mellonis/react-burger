import { useMemo } from 'react';
import { useAppSelector } from '../services/store';
import { IngredientType, Order } from '../types';

export const useOrderIngredients = ({
  limit,
  order,
}: {
  limit: number;
  order: Order;
}) => {
  const idToIngredientMap = useAppSelector(
    (state) => state.burger.idToIngredientMap
  );
  return useMemo(() => {
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
      ingredientsToRender: ingredientsToRender.slice(0, limit),
      moreIngredientsCount: ingredientsToRender.length - limit,
      price,
    };
  }, [idToIngredientMap, limit, order]);
};
