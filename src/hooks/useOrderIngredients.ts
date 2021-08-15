import { useMemo } from 'react';
import { useAppSelector } from '../services/store';
import { Ingredient_t, IngredientType, Order } from '../types';

const getOrderIngredientEntries = (ingredients: Ingredient_t[]) => {
  const bun = ingredients.find(({ type }) => type === IngredientType.bun);
  const ingredientsWithoutABun = ingredients.filter(
    ({ type }) => type !== IngredientType.bun
  );
  const ingredientToQuantityMap: Map<Ingredient_t, number> = new Map();

  if (bun) {
    ingredientToQuantityMap.set(bun, 2);
  }

  ingredientsWithoutABun.forEach((ingredient) => {
    if (!ingredientToQuantityMap.has(ingredient)) {
      ingredientToQuantityMap.set(ingredient, 0);
    }

    const currentQuantity = ingredientToQuantityMap.get(ingredient)!;

    ingredientToQuantityMap.set(ingredient, currentQuantity + 1);
  });

  return [...ingredientToQuantityMap.entries()];
};

export const useOrderIngredients = ({
  limit = Infinity,
  order,
}: {
  limit?: number;
  order: Order;
}) => {
  const idToIngredientMap = useAppSelector(
    (state) => state.burger.idToIngredientMap
  );
  return useMemo(() => {
    if (!order) {
      return {
        ingredientQuantityPairs: [],
        moreIngredientsCount: 0,
        totalPrice: 0,
      };
    }

    const ingredients = order.ingredients.map(
      (ingredientId) => idToIngredientMap[ingredientId]
    );
    const ingredientQuantityPairs = getOrderIngredientEntries(ingredients);

    return {
      ingredientQuantityPairs: ingredientQuantityPairs.slice(0, limit),
      moreIngredientsCount:
        limit < ingredientQuantityPairs.length
          ? ingredientQuantityPairs.length - limit
          : 0,
      totalPrice: ingredientQuantityPairs.reduce(
        (result, [{ price }, quantity]) => result + price * quantity,
        0
      ),
    };
  }, [idToIngredientMap, limit, order]);
};
